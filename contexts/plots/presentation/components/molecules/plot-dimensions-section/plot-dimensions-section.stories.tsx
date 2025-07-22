import type { Meta, StoryObj } from '@storybook/react';
import PlotDimensionsSection from './plot-dimensions-section';

const meta: Meta<typeof PlotDimensionsSection> = {
  title: 'Molecules/PlotDimensionsSection',
  component: PlotDimensionsSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    plot: {
      control: 'object',
    },
    formData: {
      control: 'object',
    },
    isEditing: {
      control: 'boolean',
    },
    onInputChange: {
      action: 'input-changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPlot = {
  id: 'plot-1',
  name: 'Vegetable Garden A',
  description:
    'A productive vegetable garden with mixed crops including tomatoes, lettuce, and herbs.',
  status: 'active',
  soilType: 'loamy',
  soilPh: 6.8,
  farmId: 'farm-1',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-03-20T14:30:00Z',
  deletedAt: '',
  dimensions: {
    width: 10,
    length: 5,
    height: 0.3,
    area: 50,
    perimeter: 30,
    volume: 15,
    unitMeasurement: 'm',
    unitMeasurementCategory: 'metric',
  },
};

const mockFormData = {
  width: '10',
  length: '5',
  height: '0.3',
  unitMeasurement: 'm',
};

export const Default: Story = {
  args: {
    plot: mockPlot,
    formData: mockFormData,
    isEditing: false,
  },
};

export const Editing: Story = {
  args: {
    plot: mockPlot,
    formData: mockFormData,
    isEditing: true,
  },
};

export const LargePlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      dimensions: {
        width: 50,
        length: 30,
        height: 0.5,
        area: 1500,
        perimeter: 160,
        volume: 750,
        unitMeasurement: 'm',
        unitMeasurementCategory: 'metric',
      },
    },
    formData: {
      width: '50',
      length: '30',
      height: '0.5',
    },
    isEditing: false,
  },
};

export const SmallPlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      dimensions: {
        width: 2,
        length: 3,
        height: 0.2,
        area: 6,
        perimeter: 10,
        volume: 1.2,
        unitMeasurement: 'm',
        unitMeasurementCategory: 'metric',
      },
    },
    formData: {
      width: '2',
      length: '3',
      height: '0.2',
    },
    isEditing: false,
  },
};

export const ImperialUnits: Story = {
  args: {
    plot: {
      ...mockPlot,
      dimensions: {
        width: 32.8,
        length: 16.4,
        height: 1,
        area: 538.2,
        perimeter: 98.4,
        volume: 538.2,
        unitMeasurement: 'ft',
        unitMeasurementCategory: 'imperial',
      },
    },
    formData: {
      width: '32.8',
      length: '16.4',
      height: '1',
      unitMeasurement: 'ft',
    },
    isEditing: false,
  },
};

export const Centimeters: Story = {
  args: {
    plot: {
      ...mockPlot,
      dimensions: {
        width: 1000,
        length: 500,
        height: 30,
        area: 500000,
        perimeter: 3000,
        volume: 15000000,
        unitMeasurement: 'cm',
        unitMeasurementCategory: 'metric',
      },
    },
    formData: {
      width: '1000',
      length: '500',
      height: '30',
      unitMeasurement: 'cm',
    },
    isEditing: false,
  },
};

export const Inches: Story = {
  args: {
    plot: {
      ...mockPlot,
      dimensions: {
        width: 393.7,
        length: 196.85,
        height: 11.81,
        area: 77500,
        perimeter: 1181.1,
        volume: 914500,
        unitMeasurement: 'in',
        unitMeasurementCategory: 'imperial',
      },
    },
    formData: {
      width: '393.7',
      length: '196.85',
      height: '11.81',
      unitMeasurement: 'in',
    },
    isEditing: false,
  },
};

export const SquarePlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      dimensions: {
        width: 10,
        length: 10,
        height: 0.3,
        area: 100,
        perimeter: 40,
        volume: 30,
        unitMeasurement: 'm',
        unitMeasurementCategory: 'metric',
      },
    },
    formData: {
      width: '10',
      length: '10',
      height: '0.3',
    },
    isEditing: false,
  },
};
