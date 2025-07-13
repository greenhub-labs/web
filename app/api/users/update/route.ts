import { NextRequest, NextResponse } from 'next/server';
import { UPDATE_USER_MUTATION } from '@/contexts/users/infrastructure/graphql/mutations/users-mutations.graphql';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';

export async function POST(req: NextRequest) {
  try {
    const cookies = req.headers.get('cookie') || undefined;
    const client = createApolloClient(cookies);
    const { user } = await req.json();
    const parseResult = userSchema.safeParse(user);
    if (!parseResult.success) {
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
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
