// Utility functions for authentication cookies (DDD shared lib)

/**
 * Extracts a token value from a cookie string by name.
 * @param cookie The cookie string (e.g. from headers)
 * @param name The name of the token to extract
 * @returns The token value or undefined
 */
export function extractTokenFromCookie(
  cookie: string | undefined,
  name: string,
): string | undefined {
  if (!cookie) return undefined;
  const match = cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : undefined;
}

/**
 * Rebuilds the cookie string, replacing or inserting the accessToken.
 * @param cookies The original cookie string
 * @param accessToken The new accessToken value
 * @returns The rebuilt cookie string
 */
export function rebuildCookieWithAccessToken(
  cookies: string | undefined,
  accessToken: string,
): string {
  const otherCookies = cookies
    ? cookies
        .split(';')
        .filter((c) => !c.trim().startsWith('accessToken='))
        .join('; ')
    : '';
  return `accessToken=${accessToken};${otherCookies ? ' ' + otherCookies : ''}`;
}

/**
 * Gets the access token cookie configuration
 * @returns Cookie configuration object for access tokens
 */
export function getAccessTokenCookieConfig() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: parseInt(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE || '3600'),
  };
}

/**
 * Gets the refresh token cookie configuration
 * @returns Cookie configuration object for refresh tokens
 */
export function getRefreshTokenCookieConfig() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: parseInt(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE || '604800'), // 7 days default
  };
}

/**
 * Gets the cookie configuration for clearing cookies (logout)
 * @returns Cookie configuration object for clearing cookies
 */
export function getClearCookieConfig() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  };
}

/**
 * Tries to refresh the accessToken using the refreshToken cookie.
 * @param cookies The original cookie string (from headers)
 * @param baseUrl The base URL for the API (e.g., process.env.NEXT_PUBLIC_BASE_URL)
 * @returns Un objeto con accessToken, setCookieHeader y error (si ocurre)
 */
export async function tryRefreshAccessToken(
  cookies: string | undefined,
  baseUrl: string = 'http://localhost:3000',
): Promise<{
  accessToken?: string;
  setCookieHeader?: string | null;
  error?: string;
}> {
  try {
    const res = await fetch(`${baseUrl}/api/auth/refresh-token`, {
      method: 'POST',
      headers: { cookie: cookies || '' },
    });
    if (res.ok) {
      const data = await res.json();
      const accessToken = data.refreshToken?.accessToken;
      const setCookieHeader = res.headers.get('set-cookie');
      return { accessToken, setCookieHeader };
    } else {
      return { error: 'Session expired' };
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
