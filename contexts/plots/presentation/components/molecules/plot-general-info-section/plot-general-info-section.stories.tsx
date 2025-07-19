import type { Meta, StoryObj } from '@storybook/react';
import PlotGeneralInfoSection from './plot-general-info-section';

const meta: Meta<typeof PlotGeneralInfoSection> = {
  title: 'Molecules/PlotGeneralInfoSection',
  component: PlotGeneralInfoSection,
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
  name: 'Vegetable Garden A',
  description:
    'A productive vegetable garden with mixed crops including tomatoes, lettuce, and herbs.',
  soilType: 'loamy',
  soilPh: '6.8',
  status: 'active',
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

export const DifferentSoilType: Story = {
  args: {
    plot: {
      ...mockPlot,
      soilType: 'clay',
    },
    formData: {
      ...mockFormData,
      soilType: 'clay',
    },
    isEditing: false,
  },
};

export const InactiveStatus: Story = {
  args: {
    plot: {
      ...mockPlot,
      status: 'inactive',
    },
    formData: {
      ...mockFormData,
      status: 'inactive',
    },
    isEditing: false,
  },
};

export const PreparingStatus: Story = {
  args: {
    plot: {
      ...mockPlot,
      status: 'preparing',
    },
    formData: {
      ...mockFormData,
      status: 'preparing',
    },
    isEditing: false,
  },
};

export const RestingStatus: Story = {
  args: {
    plot: {
      ...mockPlot,
      status: 'resting',
    },
    formData: {
      ...mockFormData,
      status: 'resting',
    },
    isEditing: false,
  },
};
