import { NextRequest, NextResponse } from 'next/server';
import axiosClient from '@/contexts/shared/infrastructure/api/axios-client';
import { ME_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';
import { User } from '@/contexts/users/domain/entities/user.entity';
import { meResponseSchema } from '@/contexts/auth/domain/validators/me-response.schema';

export async function GET(req: NextRequest) {
  try {
    // 1. Extract the accessToken from the cookie
    const accessToken = req.cookies.get('accessToken')?.value;

    // 2. Make the request using axiosClient and pass the token as a special header
    const response = await axiosClient.post(
      '', // If baseURL is already the GraphQL endpoint, here it's empty
      {
        query: ME_QUERY,
        variables: {},
      },
      {
        headers: {
          _accessToken: accessToken, // The interceptor will convert it to Authorization
        },
      },
    );

    const data = response.data as { data: { me: any } };
    // Validate with Zod
    const parseResult = meResponseSchema.safeParse(data.data.me);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues },
        { status: 500 },
      );
    }
    // Return the validated user object as is
    return NextResponse.json(parseResult.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
