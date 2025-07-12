import axiosClient from '@/contexts/shared/infrastructure/api/axios-client';
import { LOGIN_EMAIL_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const variables = { input: { email, password } };
    const response = await axiosClient.post('', {
      query: LOGIN_EMAIL_MUTATION,
      variables,
    });
    const data = response.data as {
      data: { login: { accessToken: string; refreshToken: string } };
    };
    const login = data.data.login;
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
