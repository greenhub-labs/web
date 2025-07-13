// lib/apolloClient.ts
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  Observable,
  Observer,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import fetch from 'cross-fetch';

function hasStatusCode(error: unknown): error is { statusCode: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof (error as any).statusCode === 'number'
  );
}

export function createApolloClient(cookie?: string) {
  let accessToken: string | undefined;
  if (cookie) {
    const match = cookie.match(/accessToken=([^;]+)/);
    accessToken = match ? match[1] : undefined;
  }

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      let shouldRefresh = false;

      // Detecta error GraphQL de autenticación
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (
            err.extensions?.code === 'UNAUTHENTICATED' ||
            (err.extensions?.originalError &&
              typeof err.extensions.originalError === 'object' &&
              'statusCode' in err.extensions.originalError &&
              err.extensions.originalError.statusCode === 401) ||
            err.message === 'Invalid or expired access token'
          ) {
            shouldRefresh = true;
          }
        }
      }

      // Detecta error de red 401
      if (
        networkError &&
        hasStatusCode(networkError) &&
        networkError.statusCode === 401
      ) {
        shouldRefresh = true;
      }

      if (shouldRefresh) {
        // Solo refrescar en el cliente
        if (typeof window === 'undefined') {
          // SSR: no intentar refrescar, devolver error directamente
          return;
        }
        return new Observable<any>((observer: Observer<any>) => {
          fetch(
            `${
              process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
            }/api/auth/refresh-token`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                cookie: cookie || '',
              },
            },
          )
            .then(async (res) => {
              const text = await res.text();
              if (!res.ok) throw new Error('Session expired');
              const data = JSON.parse(text);
              const newAccessToken = data.refreshToken.accessToken;
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }));
              const subscriber = {
                next: observer.next?.bind(observer),
                error: observer.error?.bind(observer),
                complete: observer.complete?.bind(observer),
              };
              forward(operation).subscribe(subscriber);
            })
            .catch((err) => {
              observer.error?.(err);
            });
        });
      }
    },
  );

  const httpLink = new HttpLink({
    uri: process.env.BACKEND_URL,
    credentials: 'include',
    fetch,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });

  return new ApolloClient({
    ssrMode: true,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}
