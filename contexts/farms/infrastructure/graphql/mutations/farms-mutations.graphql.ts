import { gql } from '@apollo/client';

export const UPDATE_FARM_MUTATION = gql`
  mutation UpdateFarm($input: UpdateFarmRequestDto!) {
    updateFarm(input: $input) {
      id
    }
  }
`;
