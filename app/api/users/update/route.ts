import { NextRequest, NextResponse } from 'next/server';
import { UPDATE_USER_MUTATION } from '@/contexts/users/infrastructure/graphql/mutations/users-mutations.graphql';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';

function extractToken(cookie: string | undefined, name: string) {
  if (!cookie) return undefined;
  const match = cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : undefined;
}

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    let accessToken = extractToken(cookies, 'accessToken');
    const refreshToken = extractToken(cookies, 'refreshToken');
    let setCookieHeader: string | null = null;

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
    const { user } = await req.json();
    const parseResult = userSchema.safeParse(user);
    if (!parseResult.success) {
      console.log('parseResult', parseResult.error.issues);
      return NextResponse.json(
        { error: parseResult.error.issues },
        { status: 400 },
      );
    }
    const variables = { input: parseResult.data };
    const response = await client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables,
    });
    if (response.errors) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 },
      );
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    console.log('error.graphQLErrors', JSON.stringify(error));
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
