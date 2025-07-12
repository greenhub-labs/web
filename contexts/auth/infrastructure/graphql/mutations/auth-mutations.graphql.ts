export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
      token
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($token: String!) {
    refreshToken(token: $token) {
      id
      email
      token
    }
  }
`;
