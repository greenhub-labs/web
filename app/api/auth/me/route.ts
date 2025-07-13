import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { ME_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';
import { meResponseSchema } from '@/contexts/auth/domain/validators/me-response.schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    const client = createApolloClient(cookies);

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
    return NextResponse.json(parseResult.data);
  } catch (error) {
    console.log('error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
