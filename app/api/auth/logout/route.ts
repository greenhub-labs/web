import { LOGOUT_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { getClearCookieConfig } from '@/contexts/shared/infrastructure/lib/cookie-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    const client = createApolloClient(cookies);
    await client.mutate({
      mutation: LOGOUT_MUTATION,
    });

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Clear cookies using reusable configuration
    response.cookies.set('accessToken', '', getClearCookieConfig());
    response.cookies.set('refreshToken', '', getClearCookieConfig());

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
