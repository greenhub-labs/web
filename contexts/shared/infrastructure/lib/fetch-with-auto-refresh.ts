// Wrapper for fetch with automatic token refresh on 401 or 'Invalid or expired access token' error in body
export async function fetchWithAutoRefresh(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  // Primera petición
  let response = await fetch(input, { ...init, credentials: 'include' });

  // Comprobar si hay que refrescar el token
  let shouldRefresh = false;
  if (response.status === 401) {
    shouldRefresh = true;
  } else {
    // Puede venir como 200 pero con error en el body
    try {
      const cloned = response.clone();
      const data = await cloned.json();
      if (data?.error === 'Invalid or expired access token') {
        shouldRefresh = true;
      }
    } catch {
      // No es JSON, ignorar
    }
  }

  if (shouldRefresh) {
    // Intentar refrescar el token
    const refreshRes = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      // Reintentar la petición original con el nuevo token
      response = await fetch(input, { ...init, credentials: 'include' });

      // Comprobar si sigue devolviendo el error
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
          // No es JSON, ignorar
        }
      }

      if (stillInvalid) {
        throw new Error('Session expired');
      }
    } else {
      // Si el refresh falla, desloguear
      throw new Error('Session expired');
    }
  }

  return response;
}
