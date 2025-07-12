import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient } from 'graphql-request';
import { ME_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';
import { User } from '@/contexts/users/domain/entities/user.entity';

const client = new GraphQLClient(process.env.BACKEND_URL!, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function GET(req: NextRequest) {
  try {
    const variables = {};
    const data = (await client.request(ME_QUERY, variables)) as {
      me: User;
    };
    return NextResponse.json(data.me);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
