import { LOGIN_EMAIL_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import {
  getAccessTokenCookieConfig,
  getRefreshTokenCookieConfig,
} from '@/contexts/shared/infrastructure/lib/cookie-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const client = createApolloClient();
  try {
    const { email, password } = await req.json();
    const variables = { input: { email, password } };
    const response = await client.mutate({
      mutation: LOGIN_EMAIL_MUTATION,
      variables,
    });
    const login = response.data.login;
    const res = NextResponse.json({ login }, { status: 200 });

    // Set access token cookie using reusable configuration
    res.cookies.set(
      'accessToken',
      login.accessToken,
      getAccessTokenCookieConfig(),
    );

    // Set refresh token cookie using reusable configuration
    res.cookies.set(
      'refreshToken',
      login.refreshToken,
      getRefreshTokenCookieConfig(),
    );

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
