import axiosClient from '@/contexts/shared/infrastructure/api/axios-client';
import { NextResponse } from 'next/server';
import { UPDATE_USER_MUTATION } from '@/contexts/users/infrastructure/graphql/mutations/users-mutations.graphql';

export async function POST(req: Request) {
  try {
    const { user } = await req.json();
    const variables = { input: user };
    await axiosClient.post('', {
      query: UPDATE_USER_MUTATION,
      variables,
    });
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
