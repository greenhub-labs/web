import axiosClient from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { NextRequest, NextResponse } from 'next/server';
import { UPDATE_USER_MUTATION } from '@/contexts/users/infrastructure/graphql/mutations/users-mutations.graphql';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    console.log('Paso 01', user);

    const accessToken = req.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate and filter user fields
    const parseResult = userSchema.safeParse(user);
    if (!parseResult.success) {
      console.log('parseResult', parseResult.error.issues);
      return NextResponse.json(
        { error: parseResult.error.issues },
        { status: 400 },
      );
    }
    const variables = { input: parseResult.data };
    console.log('Paso 02', variables);
    const response = await axiosClient.post(
      '',
      {
        query: UPDATE_USER_MUTATION,
        variables,
      },
      {
        headers: {
          _accessToken: accessToken,
        },
      },
    );
    console.log('Paso 03', response);
    if (response.status !== 200) {
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
