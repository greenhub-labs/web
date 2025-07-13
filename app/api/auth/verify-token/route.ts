import { NextRequest, NextResponse } from 'next/server';
import axiosClient from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { VERIFY_TOKEN_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const accessToken = token || req.cookies.get('accessToken')?.value;
    const response = await axiosClient.post(
      '',
      {
        query: VERIFY_TOKEN_QUERY,
        variables: {},
      },
      {
        headers: {
          _accessToken: accessToken,
        },
      },
    );
    const data = response.data as { data: { verifyToken: any } };
    return NextResponse.json(data.data.verifyToken);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
