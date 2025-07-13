import { NextRequest, NextResponse } from 'next/server';
import { UPDATE_USER_MUTATION } from '@/contexts/users/infrastructure/graphql/mutations/users-mutations.graphql';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import {
  extractTokenFromCookie,
  rebuildCookieWithAccessToken,
  tryRefreshAccessToken,
} from '@/contexts/shared/infrastructure/lib/cookie-auth';

export async function POST(req: NextRequest) {
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

    let cookieHeader = cookies;
    if (accessToken) {
      cookieHeader = rebuildCookieWithAccessToken(cookies, accessToken);
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
