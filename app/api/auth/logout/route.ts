import { NextRequest, NextResponse } from 'next/server';
import axiosClient from '@/contexts/shared/infrastructure/api/axios-client';
import { LOGOUT_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';

export async function POST(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;
    await axiosClient.post(
      '',
      { query: LOGOUT_MUTATION },
      { headers: { _accessToken: accessToken } },
    );

    // Clean the cookies in the response
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.headers.append(
      'Set-Cookie',
      'accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
    );
    response.headers.append(
      'Set-Cookie',
      'refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;',
    );
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
