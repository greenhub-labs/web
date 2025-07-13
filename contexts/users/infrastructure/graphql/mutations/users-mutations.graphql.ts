import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserRequestDto!) {
    updateUser(input: $input) {
      id
    }
  }
`;
