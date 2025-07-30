import { gql } from '@apollo/client';

export const GET_CROP_VARIETY_BY_ID_QUERY = gql`
  query GetCropVarietyById($input: GetCropVarietyByIdRequestDto!) {
    getCropVarietyById(input: $input) {
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

export const GET_CROP_VARIETIES_QUERY = gql`
  query GetCropVarieties($input: GetCropVarietiesRequestDto!) {
    getCropVarieties(input: $input) {
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

export const GET_CROP_VARIETY_BY_SCIENTIFIC_NAME_QUERY = gql`
  query GetCropVarietyByScientificName(
    $input: GetCropVarietyByScientificNameRequestDto!
  ) {
    getCropVarietyByScientificName(input: $input) {
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
