import { gql } from '@apollo/client';

export const GET_PLOT_BY_ID_QUERY = gql`
  query GetPlotById($input: GetPlotByIdRequestDto!) {
    getPlotById(input: $input) {
      id
      name
      description
      status
      soilType
      soilPh
      farmId
      createdAt
      updatedAt
      deletedAt
      dimensions {
        width
        length
        height
        area
        perimeter
        volume
        unitMeasurement
      }
    }
  }
`;
