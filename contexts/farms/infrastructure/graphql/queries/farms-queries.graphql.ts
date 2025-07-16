import { gql } from '@apollo/client';

export const GET_FARM_BY_ID_QUERY = gql`
  query GetFarmById($input: GetFarmByIdRequestDto!) {
    getFarmById(input: $input) {
      id
      name
      description
      country
      state
      city
      postalCode
      street
      latitude
      longitude
      isActive
      createdAt
      updatedAt
      deletedAt
      members {
        firstName
        createdAt
        id
        lastName
        avatar
        bio
        phone
        email
        isActive
        isDeleted
        updatedAt
        deletedAt
        role
      }
    }
  }
`;
