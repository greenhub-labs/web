import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { ME_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';
import { meResponseSchema } from '@/contexts/auth/domain/validators/me-response.schema';
import { NextRequest, NextResponse } from 'next/server';
import {
  extractTokenFromCookie,
  rebuildCookieWithAccessToken,
  tryRefreshAccessToken,
} from '@/contexts/shared/infrastructure/lib/cookie-auth';

export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    let accessToken = extractTokenFromCookie(cookies, 'accessToken');
    const refreshToken = extractTokenFromCookie(cookies, 'refreshToken');
    let setCookieHeader: string | null = null;

    if (!accessToken && refreshToken) {
      const {
        accessToken: newToken,
        setCookieHeader: newSetCookie,
        error,
      } = await tryRefreshAccessToken(
        cookies,
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      );
      if (error) {
        return NextResponse.json({ error }, { status: 401 });
      }
      accessToken = newToken;
      setCookieHeader = newSetCookie || null;
    }

    // Crea el Apollo Client con la cookie (puedes reconstruir la cookie con el nuevo accessToken si quieres)
    let cookieHeader = cookies;
    if (accessToken) {
      cookieHeader = rebuildCookieWithAccessToken(cookies, accessToken);
    }

    const client = createApolloClient(cookieHeader);

    // 1. Extract the accessToken from the cookie
    const response = await client.query({
      query: ME_QUERY,
      fetchPolicy: 'network-only',
      variables: {},
    });

    // Validate with Zod
    const parseResult = meResponseSchema.safeParse(response.data.me);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues },
        { status: 500 },
      );
    }
    // Return the validated user object as is
    const nextRes = NextResponse.json(parseResult.data);
    // Si hay setCookieHeader, propágala en la respuesta
    if (setCookieHeader) {
      nextRes.headers.set('set-cookie', setCookieHeader);
    }
    return nextRes;
  } catch (error) {
    console.log('error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
