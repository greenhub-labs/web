import { AuthRepository } from '../../application/ports/auth.repository';
import { Auth } from '../../domain/entities/auth.entity';

/**
 * Implementation of AuthRepository.
 */
export class AuthApiRepository implements AuthRepository {
  async login(email: string, password: string): Promise<Auth> {
    const url = `/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data: Auth = await response.json();
    return data;
  }
  async register(email: string, password: string): Promise<Auth> {
    const url = `/api/auth/register`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data: Auth = await response.json();
    return data;
  }
  async logout(): Promise<void> {
    const url = `/api/auth/logout`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  }
  async refreshToken(token: string): Promise<Auth> {
    const url = `/api/auth/refresh-token`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ token }),
      credentials: 'include',
    });
    const data: Auth = await response.json();
    return data;
  }
  async verifyToken(token: string): Promise<void> {
    const url = `/api/auth/verify-token`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ token }),
      credentials: 'include',
    });
    return response.json();
  }
  async me(): Promise<Auth> {
    const url = `/api/auth/me`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    const data: Auth = await response.json();
    return data;
  }
}
