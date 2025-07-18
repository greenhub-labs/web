import { gql } from '@apollo/client';

export const CREATE_PLOT_MUTATION = gql`
  mutation CreatePlot($input: CreatePlotRequestDto!) {
    createPlot(input: $input) {
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

export const UPDATE_PLOT_MUTATION = gql`
  mutation UpdatePlot($input: UpdatePlotRequestDto!) {
    updatePlot(input: $input) {
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
        unitMeasurementCategory
      }
    }
  }
`;
