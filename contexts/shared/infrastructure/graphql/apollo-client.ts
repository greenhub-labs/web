// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

export function createApolloClient(cookies?: string) {
  // Extract accessToken from cookie string
  let accessToken: string | undefined;
  if (cookies) {
    const match = cookies.match(/accessToken=([^;]+)/);
    accessToken = match ? match[1] : undefined;
  }

  return new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: process.env.BACKEND_URL,
      credentials: 'include',
      fetch,
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    }),
    cache: new InMemoryCache(),
  });
}
