import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      phone
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
export const VERIFY_TOKEN_QUERY = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      valid
      expired
      userId
      email
    }
  }
`;
