// Queries
export const ME_QUERY = `
  query Me {
    me {
        id
        firstName
        lastName
        email
        avatar
        bio
        isActive
        isDeleted
        createdAt
        updatedAt
        deletedAt
    }
  }
`;
export const VERIFY_TOKEN_MUTATION = `
  query VerifyToken($token: String!) {
    verifyToken(
        token: $token
    ) {
        valid
        expired
        userId
        email
    }
}
`;
