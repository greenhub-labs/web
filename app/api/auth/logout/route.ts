import { NextRequest, NextResponse } from 'next/server';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { LOGOUT_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    const client = createApolloClient(cookies);
    await client.mutate({
      mutation: LOGOUT_MUTATION,
    });

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
