/**
 * fetchWithAutoRefresh
 *
 * Wrapper for fetch that automatically handles access token expiration and refresh.
 *
 * Flow:
 * 1. Performs the original request with credentials included.
 * 2. If the response status is 401 or the response body contains { error: 'Invalid or expired access token' },
 *    it attempts to refresh the access token by calling '/api/auth/refresh-token'.
 * 3. If the refresh is successful, it retries the original request.
 * 4. If the retried request still returns 401 or the same error in the body, it throws an error ('Session expired')
 *    so the frontend can log out the user.
 * 5. If the refresh fails, it also throws an error ('Session expired').
 *
 * This ensures the user experience is seamless: tokens are refreshed automatically when possible,
 * and the user is only logged out if both the refresh and retry fail.
 *
 * @param input - The resource that you wish to fetch. Can be a URL or a Request object.
 * @param init - An object containing any custom settings that you want to apply to the request.
 * @returns The fetch Response object if successful, or throws an error if the session is expired.
 * @throws Error('Session expired') if the token cannot be refreshed or the retried request fails.
 */
export async function fetchWithAutoRefresh(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  // First request
  let response = await fetch(input, { ...init, credentials: 'include' });

  // Determine if we need to refresh the token
  let shouldRefresh = false;
  if (response.status === 401) {
    shouldRefresh = true;
  } else {
    // Sometimes the backend returns 200 with an error in the body
    try {
      const cloned = response.clone();
      const data = await cloned.json();
      if (data?.error === 'Invalid or expired access token') {
        shouldRefresh = true;
      }
    } catch {
      // Not JSON, ignore
    }
  }

  if (shouldRefresh) {
    // Attempt to refresh the token
    const refreshRes = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // Retry the original request with the new token
      response = await fetch(input, { ...init, credentials: 'include' });

      // Check if the error persists
      let stillInvalid = false;
      if (response.status === 401) {
        stillInvalid = true;
      } else {
        try {
          const cloned = response.clone();
          const data = await cloned.json();
          if (data?.error === 'Invalid or expired access token') {
            stillInvalid = true;
          }
        } catch {
          // Not JSON, ignore
        }
      }

      if (stillInvalid) {
        // If the error persists after refresh, force logout
        throw new Error('Session expired');
      }
    } else {
      // If refresh fails, force logout
      throw new Error('Session expired');
    }
  }

  return response;
}
