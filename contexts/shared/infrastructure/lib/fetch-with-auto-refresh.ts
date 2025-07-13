// Wrapper for fetch with automatic token refresh on 401
export async function fetchWithAutoRefresh(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  let response = await fetch(input, { ...init, credentials: 'include' });
  if (response.status === 401) {
    // Try to refresh the token
    const refreshRes = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    if (refreshRes.ok) {
      // Retry the original request
      response = await fetch(input, { ...init, credentials: 'include' });
    } else {
      // If refresh fails, throw error
      throw new Error('Session expired');
    }
  }
  return response;
}
