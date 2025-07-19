import type { Meta, StoryObj } from '@storybook/react';
import { PlotSizeIndicator } from './plot-size-indicator';

const meta: Meta<typeof PlotSizeIndicator> = {
  title: 'Plots/Atoms/PlotSizeIndicator',
  component: PlotSizeIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A component to display plot dimensions in a consistent format.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockDimensions = {
  width: 4,
  length: 3,
  height: 0.5,
  area: 12,
  perimeter: 14,
  volume: 6,
  unitMeasurement: 'm',
  unitMeasurementCategory: 'metric',
};

export const Default: Story = {
  args: {
    dimensions: mockDimensions,
  },
};

export const LargePlot: Story = {
  args: {
    dimensions: {
      ...mockDimensions,
      width: 10,
      length: 8,
      area: 80,
      perimeter: 36,
    },
  },
};

export const SmallPlot: Story = {
  args: {
    dimensions: {
      ...mockDimensions,
      width: 2,
      length: 1.5,
      area: 3,
      perimeter: 7,
    },
  },
};

export const ImperialUnits: Story = {
  args: {
    dimensions: {
      ...mockDimensions,
      width: 12,
      length: 8,
      unitMeasurement: 'ft',
      unitMeasurementCategory: 'imperial',
      area: 96,
      perimeter: 40,
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <PlotSizeIndicator
        dimensions={{
          width: 2,
          length: 1.5,
          height: 0.5,
          area: 3,
          perimeter: 7,
          volume: 1.5,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        }}
      />
      <PlotSizeIndicator
        dimensions={{
          width: 4,
          length: 3,
          height: 0.5,
          area: 12,
          perimeter: 14,
          volume: 6,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        }}
      />
      <PlotSizeIndicator
        dimensions={{
          width: 10,
          length: 8,
          height: 0.5,
          area: 80,
          perimeter: 36,
          volume: 40,
          unitMeasurement: 'm',
          unitMeasurementCategory: 'metric',
        }}
      />
    </div>
  ),
};
