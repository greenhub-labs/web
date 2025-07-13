import { LOGIN_EMAIL_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
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
    res.headers.append(
      'Set-Cookie',
      `accessToken=${login.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${login.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
