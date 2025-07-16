import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import { ME_QUERY } from '@/contexts/auth/infrastructure/graphql/queries/auth-queries.graphql';
import { meResponseSchema } from '@/contexts/auth/domain/validators/me-response.schema';
import { NextRequest, NextResponse } from 'next/server';
import {
  extractTokenFromCookie,
  rebuildCookieWithAccessToken,
  tryRefreshAccessToken,
} from '@/contexts/shared/infrastructure/lib/cookie-auth';
import { GET_FARM_BY_ID_QUERY } from '@/contexts/farms/infrastructure/graphql/queries/farms-queries.graphql';
import { UPDATE_FARM_MUTATION } from '@/contexts/farms/infrastructure/graphql/mutations/farms-mutations.graphql';

export async function POST(req: NextRequest) {
  try {
    const { farm } = await req.json();
    console.log('farm', farm);
    const cookies = req.headers.get('cookie') || undefined;
    let accessToken = extractTokenFromCookie(cookies, 'accessToken');
    const refreshToken = extractTokenFromCookie(cookies, 'refreshToken');
    let setCookieHeader: string | null = null;

    if (!accessToken && refreshToken) {
      const {
        accessToken: newToken,
        setCookieHeader: newSetCookie,
        error,
      } = await tryRefreshAccessToken(
        cookies,
        process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      );
      if (error) {
        return NextResponse.json({ error }, { status: 401 });
      }
      accessToken = newToken;
      setCookieHeader = newSetCookie || null;
    }

    // Crea el Apollo Client con la cookie (puedes reconstruir la cookie con el nuevo accessToken si quieres)
    let cookieHeader = cookies;
    if (accessToken) {
      cookieHeader = rebuildCookieWithAccessToken(cookies, accessToken);
    }

    const client = createApolloClient(cookieHeader);

    const variables = {
      input: {
        id: farm.id,
        name: farm.name,
        description: farm.description,
        country: farm.country,
        state: farm.state,
        city: farm.city,
        postalCode: farm.postalCode,
        street: farm.street,
        latitude: farm.latitude,
        longitude: farm.longitude,
      },
    };

    // 1. Extract the accessToken from the cookie
    const response = await client.mutate({
      mutation: UPDATE_FARM_MUTATION,
      fetchPolicy: 'network-only',
      variables,
    });

    const nextRes = NextResponse.json(response.data.updateFarm);
    // Si hay setCookieHeader, propágala en la respuesta
    if (setCookieHeader) {
      nextRes.headers.set('set-cookie', setCookieHeader);
    }
    return nextRes;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
