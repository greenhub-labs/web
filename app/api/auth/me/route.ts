import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { ME_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';
import { meResponseSchema } from '@/contexts/auth/domain/validators/me-response.schema';
import { NextRequest, NextResponse } from 'next/server';

function extractToken(cookie: string | undefined, name: string) {
  if (!cookie) return undefined;
  const match = cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : undefined;
}

export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    let accessToken = extractToken(cookies, 'accessToken');
    const refreshToken = extractToken(cookies, 'refreshToken');
    let setCookieHeader: string | null = null;

    // Si no hay accessToken pero sí refreshToken, intenta refrescar
    if (!accessToken && refreshToken) {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }/api/auth/refresh-token`,
        {
          method: 'POST',
          headers: { cookie: cookies || '' },
        },
      );
      if (res.ok) {
        const data = await res.json();
        accessToken = data.refreshToken.accessToken;
        // Extrae la cabecera Set-Cookie
        setCookieHeader = res.headers.get('set-cookie');
      } else {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
      }
    }

    // Crea el Apollo Client con la cookie (puedes reconstruir la cookie con el nuevo accessToken si quieres)
    let cookieHeader = cookies;
    if (accessToken) {
      // Reconstruye la cookie para incluir el nuevo accessToken si fue refrescado
      const otherCookies = cookies
        ? cookies
            .split(';')
            .filter((c) => !c.trim().startsWith('accessToken='))
            .join('; ')
        : '';
      cookieHeader = `accessToken=${accessToken};${
        otherCookies ? ' ' + otherCookies : ''
      }`;
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
