import { NextRequest, NextResponse } from 'next/server';
import axiosClient from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { REFRESH_TOKEN_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';

export async function POST(req: NextRequest) {
  try {
    // Extrae el refreshToken de la cookie
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if (!refreshToken) {
      // Si no hay refreshToken, limpia cookies y devuelve 401
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
  } catch (error: any) {
    // Si el backend devuelve error de autenticación, limpia cookies y devuelve 401
    const isAuthError = error?.response?.data?.errors?.some(
      (err: any) =>
        err.extensions?.code === 'UNAUTHENTICATED' ||
        err.message?.toLowerCase().includes('unauthenticated') ||
        err.message?.toLowerCase().includes('not authenticated'),
    );
    const status = isAuthError ? 401 : 500;
    const res = NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status },
    );
    if (isAuthError) {
      res.headers.append(
        'Set-Cookie',
        `accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;`,
      );
      res.headers.append(
        'Set-Cookie',
        `refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0;`,
      );
    }
    return res;
  }
}
