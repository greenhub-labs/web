import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_TOKEN_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    const client = createApolloClient(cookies);
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      const res = NextResponse.json(
        { error: 'Refresh token is missing' },
        { status: 401 },
      );
      res.headers.append(
        'Set-Cookie',
        `accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;`,
      );
      res.headers.append(
        'Set-Cookie',
        `refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;`,
      );
      return res;
    }
    const response = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
    });
    const tokens = response.data.refreshToken;
    const res = NextResponse.json({ refreshToken: tokens }, { status: 200 });
    res.headers.append(
      'Set-Cookie',
      `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${process.env.ACCESS_TOKEN_COOKIE_MAX_AGE};`,
    );
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${process.env.REFRESH_TOKEN_COOKIE_MAX_AGE};`,
    );
    return res;
  } catch (error: any) {
    const res = NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
    return res;
  }
}
