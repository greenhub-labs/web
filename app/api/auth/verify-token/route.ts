import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { VERIFY_TOKEN_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';

const client = new GraphQLClient(process.env.BACKEND_URL!, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const variables = { token };
    const data = (await client.request(VERIFY_TOKEN_QUERY, variables)) as {
      verifyToken: {
        valid: boolean;
        expired: boolean;
        userId: string;
        email: string;
      };
    };
    return NextResponse.json(data.verifyToken);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
