import { REGISTER_EMAIL_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    const client = createApolloClient(cookies);
    const { email, password } = await req.json();
    const variables = { input: { email, password } };
    const response = await client.mutate({
      mutation: REGISTER_EMAIL_MUTATION,
      variables,
    });
    const register = response.data.register;
    const res = NextResponse.json({ register }, { status: 200 });
    res.headers.append(
      'Set-Cookie',
      `accessToken=${register.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${process.env.ACCESS_TOKEN_COOKIE_MAX_AGE};`,
    );
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${register.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${process.env.REFRESH_TOKEN_COOKIE_MAX_AGE};`,
    );
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
