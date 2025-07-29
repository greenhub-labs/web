import { UPDATE_CROP_MUTATION } from '@/contexts/crops/infrastructure/graphql/mutations/crops-mutations.graphql';
import { createApolloClient } from '@/contexts/shared/infrastructure/graphql/apollo-client';
import {
  extractTokenFromCookie,
  rebuildCookieWithAccessToken,
  tryRefreshAccessToken,
} from '@/contexts/shared/infrastructure/lib/cookie-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { crop } = await req.json();
    console.log('crop', crop);
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
        id: crop.id,
        plotId: crop.plotId,
        varietyId: crop.varietyId,
        plantingDate: crop.plantingDate,
        expectedHarvest: crop.expectedHarvest,
        actualHarvest: crop.actualHarvest,
        quantity: crop.quantity,
        status: crop.status,
        plantingMethod: crop.plantingMethod,
        notes: crop.notes,
      },
    };

    // 1. Extract the accessToken from the cookie
    const response = await client.mutate({
      mutation: UPDATE_CROP_MUTATION,
      fetchPolicy: 'network-only',
      variables,
    });

    const nextRes = NextResponse.json(response.data.updateCrop);
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
