export const LOGIN_EMAIL_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
        accessToken
        refreshToken
      
    }
  }
`;

export const REGISTER_EMAIL_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
        accessToken
        refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
        accessToken
        refreshToken
    }
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;
