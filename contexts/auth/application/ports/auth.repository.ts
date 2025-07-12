import { Auth } from '@/contexts/auth/domain/entities/auth.entity';

/**
 * Repository interface for authentication operations
 */
export interface AuthRepository {
  /**
   * Authenticates a user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise resolving to authenticated user data
   */
  login(email: string, password: string): Promise<Auth>;

  /**
   * Creates a new user account
   * @param email - Email for the new account
   * @param password - Password for the new account
   * @returns Promise resolving to the created user data
   */
  register(email: string, password: string): Promise<Auth>;

  /**
   * Logs out the current user
   * @returns Promise that resolves when logout is complete
   */
  logout(): Promise<void>;

  /**
   * Refreshes an authentication token
   * @param token - Current authentication token
   * @returns Promise resolving to refreshed user data
   */
  refreshToken(token: string): Promise<Auth>;

  /**
   * Verifies if a token is valid
   * @param token - Token to verify
   * @returns Promise that resolves if token is valid, rejects if invalid
   */
  verifyToken(token: string): Promise<void>;

  /**
   * Gets the current authenticated user's data
   * @returns Promise resolving to current user data
   */
  me(): Promise<Auth>;
}
