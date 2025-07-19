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

export const Default: Story = {
  args: {
    plot: mockPlot,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    plot: null,
    isLoading: true,
  },
};

export const NotFound: Story = {
  args: {
    plot: null,
    isLoading: false,
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
  },
};
