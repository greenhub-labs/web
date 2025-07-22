import type { Meta, StoryObj } from '@storybook/react';
import PlotDetailPageComponent from './plot-detail-page';

const meta: Meta<typeof PlotDetailPageComponent> = {
  title: 'Pages/PlotDetailPage',
  component: PlotDetailPageComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    plot: {
      control: 'object',
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPlot = {
  id: 'plot-1',
  name: 'Vegetable Garden A',
  description:
    'A productive vegetable garden with mixed crops including tomatoes, lettuce, and herbs. Located in the north section of the farm.',
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

const defaultFormData = {
  name: 'Vegetable Garden A',
  description:
    'A productive vegetable garden with mixed crops including tomatoes, lettuce, and herbs. Located in the north section of the farm.',
  soilType: 'loamy',
  soilPh: '6.8',
  status: 'active',
  width: '10',
  length: '5',
  height: '0.3',
  unitMeasurement: 'm',
};

const defaultHandlers = {
  onEdit: () => {},
  onSave: () => {},
  onCancel: () => {},
  onDelete: () => {},
  onInputChange: () => {},
};

export const Default: Story = {
  args: {
    plot: mockPlot,
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    formData: defaultFormData,
    ...defaultHandlers,
  },
};

export const Loading: Story = {
  args: {
    plot: null,
    isLoading: true,
    isEditing: false,
    isDeleting: false,
    formData: defaultFormData,
    ...defaultHandlers,
  },
};

export const NotFound: Story = {
  args: {
    plot: null,
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    formData: defaultFormData,
    ...defaultHandlers,
  },
};

export const LargePlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      name: 'Large Commercial Plot',
      description:
        'A large commercial plot used for extensive crop production. Features advanced irrigation systems and monitoring equipment.',
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
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    formData: {
      ...defaultFormData,
      name: 'Large Commercial Plot',
      description:
        'A large commercial plot used for extensive crop production. Features advanced irrigation systems and monitoring equipment.',
      width: '50',
      length: '30',
      height: '0.5',
    },
    ...defaultHandlers,
  },
};

export const SmallPlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      name: 'Herb Garden',
      description:
        'A small herb garden with aromatic plants. Perfect for culinary herbs and medicinal plants.',
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
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    formData: {
      ...defaultFormData,
      name: 'Herb Garden',
      description:
        'A small herb garden with aromatic plants. Perfect for culinary herbs and medicinal plants.',
      width: '2',
      length: '3',
      height: '0.2',
    },
    ...defaultHandlers,
  },
};

export const InactivePlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      name: 'Resting Plot',
      status: 'resting',
      description:
        'This plot is currently resting between growing seasons to restore soil nutrients.',
    },
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    formData: {
      ...defaultFormData,
      name: 'Resting Plot',
      description:
        'This plot is currently resting between growing seasons to restore soil nutrients.',
      status: 'resting',
    },
    ...defaultHandlers,
  },
};

export const PreparingPlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      name: 'New Plot',
      status: 'preparing',
      description: 'A new plot being prepared for the upcoming growing season.',
    },
    isLoading: false,
    isEditing: false,
    isDeleting: false,
    formData: {
      ...defaultFormData,
      name: 'New Plot',
      description: 'A new plot being prepared for the upcoming growing season.',
      status: 'preparing',
    },
    ...defaultHandlers,
  },
};

export const Editing: Story = {
  args: {
    plot: mockPlot,
    isLoading: false,
    isEditing: true,
    isDeleting: false,
    formData: defaultFormData,
    ...defaultHandlers,
  },
};

export const Deleting: Story = {
  args: {
    plot: mockPlot,
    isLoading: false,
    isEditing: false,
    isDeleting: true,
    formData: defaultFormData,
    ...defaultHandlers,
  },
};
