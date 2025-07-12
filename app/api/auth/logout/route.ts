import { LOGOUT_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { GraphQLClient } from 'graphql-request';
import { NextResponse } from 'next/server';

const client = new GraphQLClient(process.env.BACKEND_URL!, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function POST(req: Request) {
  try {
    const data = (await client.request(LOGOUT_MUTATION)) as {
      logout: { success: boolean };
    };
    const response = NextResponse.json(data, { status: 200 });
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
