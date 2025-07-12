import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  const graphqlResponse = await fetch(process.env.NEST_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: `
        query Me {
          me {
            id
            email
          }
        }
      `,
    }),
  });

  const { data, errors } = await graphqlResponse.json();
  if (errors) return NextResponse.json({ errors }, { status: 400 });
  return NextResponse.json(data.me);
}
