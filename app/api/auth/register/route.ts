import { REGISTER_EMAIL_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import axiosClient from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const variables = { input: { email, password } };
    const response = await axiosClient.post('', {
      query: REGISTER_EMAIL_MUTATION,
      variables,
    });
    const data = response.data as {
      data: { register: { accessToken: string; refreshToken: string } };
    };
    const register = data.data.register;
    const res = NextResponse.json({ register }, { status: 200 });
    res.headers.append(
      'Set-Cookie',
      `accessToken=${register.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${register.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
