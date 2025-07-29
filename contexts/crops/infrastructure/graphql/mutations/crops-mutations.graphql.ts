import { gql } from '@apollo/client';

export const CREATE_CROP_MUTATION = gql`
  mutation CreateCrop($input: CreateCropRequestDto!) {
    createCrop(input: $input) {
      id
      plotId
      varietyId
      plantingDate
      expectedHarvest
      actualHarvest
      quantity
      status
      plantingMethod
      notes
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_CROP_MUTATION = gql`
  mutation UpdateCrop($input: UpdateCropRequestDto!) {
    updateCrop(input: $input) {
      id
      plotId
      varietyId
      plantingDate
      expectedHarvest
      actualHarvest
      quantity
      status
      plantingMethod
      notes
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_CROP_MUTATION = gql`
  mutation DeleteCrop($input: DeleteCropRequestDto!) {
    deleteCrop(input: $input)
  }
`;
