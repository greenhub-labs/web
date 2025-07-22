import { REFRESH_TOKEN_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import {
  getAccessTokenCookieConfig,
  getClearCookieConfig,
  getRefreshTokenCookieConfig,
} from '@/contexts/shared/infrastructure/lib/cookie-auth';
import { NextRequest, NextResponse } from 'next/server';

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

      // Clear cookies using reusable configuration
      res.cookies.set('accessToken', '', getClearCookieConfig());
      res.cookies.set('refreshToken', '', getClearCookieConfig());
      return res;
    }

    const response = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { refreshToken },
    });
    const tokens = response.data.refreshToken;
    const res = NextResponse.json({ refreshToken: tokens }, { status: 200 });

    // Set new access token cookie using reusable configuration
    res.cookies.set(
      'accessToken',
      tokens.accessToken,
      getAccessTokenCookieConfig(),
    );

    // Set new refresh token cookie using reusable configuration
    res.cookies.set(
      'refreshToken',
      tokens.refreshToken,
      getRefreshTokenCookieConfig(),
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
