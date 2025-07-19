import type { Meta, StoryObj } from '@storybook/react';
import { PlotCard } from './plot-card';

const meta: Meta<typeof PlotCard> = {
  title: 'Plots/Molecules/PlotCard',
  component: PlotCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A card component for displaying plot information with status, dimensions, and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onViewDetails: { action: 'view-details' },
    onDelete: { action: 'delete' },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockPlot = {
  id: '1',
  name: 'Bancal A',
  description: 'Plot for vegetables and herbs',
  status: 'active',
  soilType: 'loam',
  soilPh: 6.5,
  farmId: 'farm-1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  deletedAt: '',
  dimensions: {
    width: 4,
    length: 3,
    height: 0.5,
    area: 12,
    perimeter: 14,
    volume: 6,
    unitMeasurement: 'm',
    unitMeasurementCategory: 'metric',
  },
};

export const Default: Story = {
  args: {
    plot: mockPlot,
  },
};

export const Inactive: Story = {
  args: {
    plot: {
      ...mockPlot,
      status: 'inactive',
    },
  },
};

export const Preparing: Story = {
  args: {
    plot: {
      ...mockPlot,
      status: 'preparing',
    },
  },
};

export const Resting: Story = {
  args: {
    plot: {
      ...mockPlot,
      status: 'resting',
    },
  },
};

export const LargePlot: Story = {
  args: {
    plot: {
      ...mockPlot,
      name: 'Bancal Grande',
      dimensions: {
        ...mockPlot.dimensions,
        width: 10,
        length: 8,
        area: 80,
        perimeter: 36,
      },
    },
  },
};

export const LongName: Story = {
  args: {
    plot: {
      ...mockPlot,
      name: 'Bancal con nombre muy largo que debería truncarse correctamente',
      description:
        'Esta es una descripción muy larga que también debería truncarse para mantener el diseño limpio y organizado',
    },
  },
};
