import { REFRESH_TOKEN_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.BACKEND_URL!, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    const variables = { refreshToken };
    const data = (await client.request(REFRESH_TOKEN_MUTATION, variables)) as {
      refreshToken: { accessToken: string; refreshToken: string };
    };

    const response = NextResponse.json(data, { status: 200 });
    response.headers.append(
      'Set-Cookie',
      `accessToken=${data.refreshToken.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    response.headers.append(
      'Set-Cookie',
      `refreshToken=${data.refreshToken.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
