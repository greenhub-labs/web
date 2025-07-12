import { NextRequest, NextResponse } from 'next/server';
import axiosClient from '@/contexts/shared/infrastructure/api/axios-client';
import { REFRESH_TOKEN_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';

export async function POST(req: NextRequest) {
  try {
    // Extrae el refreshToken de la cookie
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const response = await axiosClient.post(
      '',
      {
        query: REFRESH_TOKEN_MUTATION,
        variables: {},
      },
      {
        headers: {
          _accessToken: refreshToken, // El interceptor lo convertirá en Authorization
        },
      },
    );
    // El backend debe devolver { refreshToken: { accessToken, refreshToken } }
    const data = response.data as {
      data: { refreshToken: { accessToken: string; refreshToken: string } };
    };
    const tokens = data.data.refreshToken;
    const res = NextResponse.json({ refreshToken: tokens }, { status: 200 });
    res.headers.append(
      'Set-Cookie',
      `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    res.headers.append(
      'Set-Cookie',
      `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
