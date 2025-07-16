import { gql } from '@apollo/client';

export const UPDATE_FARM_MUTATION = gql`
  mutation UpdateFarm($input: UpdateFarmRequestDto!) {
    updateFarm(input: $input) {
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
        id
        firstName
        lastName
        avatar
        bio
        phone
        email
        isActive
        isDeleted
        createdAt
        updatedAt
        deletedAt
        role
      }
    }
  }
`;
