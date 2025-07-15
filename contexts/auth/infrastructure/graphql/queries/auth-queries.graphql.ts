import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      firstName
      lastName
      avatar
      bio
      isActive
      isDeleted
      createdAt
      updatedAt
      deletedAt
      farms {
        farmId
        farmName
        role
      }
      email
      phone
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
