import { gql } from '@apollo/client';

export const CREATE_CROP_VARIETY_MUTATION = gql`
  mutation CreateCropVariety($input: CreateCropVarietyRequestDto!) {
    createCropVariety(input: $input) {
      id
      name
      scientificName
      type
      description
      averageYield
      daysToMaturity
      plantingDepth
      spacingBetween
      waterRequirements
      sunRequirements
      minIdealTemperature
      maxIdealTemperature
      minIdealPh
      maxIdealPh
      compatibleWith
      incompatibleWith
      plantingSeasons
      harvestSeasons
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_CROP_VARIETY_MUTATION = gql`
  mutation UpdateCropVariety($input: UpdateCropVarietyRequestDto!) {
    updateCropVariety(input: $input) {
      id
      name
      scientificName
      type
      description
      averageYield
      daysToMaturity
      plantingDepth
      spacingBetween
      waterRequirements
      sunRequirements
      minIdealTemperature
      maxIdealTemperature
      minIdealPh
      maxIdealPh
      compatibleWith
      incompatibleWith
      plantingSeasons
      harvestSeasons
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_CROP_VARIETY_MUTATION = gql`
  mutation DeleteCropVariety($input: DeleteCropVarietyRequestDto!) {
    deleteCropVariety(input: $input)
  }
`;
