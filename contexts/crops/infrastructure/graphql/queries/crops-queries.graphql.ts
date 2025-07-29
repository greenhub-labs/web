import { gql } from '@apollo/client';

export const GET_CROP_BY_ID_QUERY = gql`
  query GetCropById($input: GetCropByIdRequestDto!) {
    getCropById(input: $input) {
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

export const GET_CROPS_BY_PLOT_ID_QUERY = gql`
  query GetCropsByPlotId($input: GetCropsByPlotIdRequestDto!) {
    getCropsByPlotId(input: $input) {
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

export const GET_CROPS_BY_FARM_ID_QUERY = gql`
  query GetCropsByFarmId($input: GetCropsByFarmIdRequestDto!) {
    getCropsByFarmId(input: $input) {
      id
      farmId
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
