import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const graphqlResponse = await fetch(process.env.NEST_GRAPHQL_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation VerifyToken($token: String!) {
          verifyToken(token: $token)
        }
      `,
      variables: { token },
    }),
  });

  const { data, errors } = await graphqlResponse.json();
  if (errors) return NextResponse.json({ errors }, { status: 400 });
  return NextResponse.json({ valid: data.verifyToken });
}
