import { REGISTER_EMAIL_MUTATION } from '@/contexts/auth/infrastructure/graphql/mutations/auth-mutations.graphql';
import { GraphQLClient } from 'graphql-request';
import { NextRequest, NextResponse } from 'next/server';

const client = new GraphQLClient(process.env.BACKEND_URL!, {
  headers: {
    'Content-Type': 'application/json',
  },
});
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const variables = { input: { email, password } };
    const data = (await client.request(REGISTER_EMAIL_MUTATION, variables)) as {
      register: { accessToken: string; refreshToken: string };
    };
    const response = NextResponse.json(data, { status: 200 });
    // Set cookies in the response headers
    response.headers.append(
      'Set-Cookie',
      `accessToken=${data.register.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    response.headers.append(
      'Set-Cookie',
      `refreshToken=${data.register.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600;`,
    );
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
