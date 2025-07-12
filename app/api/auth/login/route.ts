import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const graphqlResponse = await fetch(process.env.NEST_GRAPHQL_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            id
            email
            token
          }
        }
      `,
      variables: { email, password },
    }),
  });

  const { data, errors } = await graphqlResponse.json();
  if (errors) return NextResponse.json({ errors }, { status: 400 });
  return NextResponse.json(data.login);
}
