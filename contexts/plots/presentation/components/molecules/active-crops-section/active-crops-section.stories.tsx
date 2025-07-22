import type { Meta, StoryObj } from '@storybook/react';
import { ActiveCropsSection } from './active-crops-section';

const meta: Meta<typeof ActiveCropsSection> = {
  title: 'Plots/Molecules/ActiveCropsSection',
  component: ActiveCropsSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCrops = [
  {
    id: '1',
    name: 'Tomates',
    icon: '🍅',
    plantedDate: '2024-01-15',
    harvestDate: '2024-04-15',
  },
  {
    id: '2',
    name: 'Albahaca',
    icon: '🌿',
    plantedDate: '2024-01-20',
    harvestDate: '2024-03-20',
  },
  {
    id: '3',
    name: 'Lechugas',
    icon: '🥬',
    plantedDate: '2024-02-01',
    harvestDate: '2024-04-01',
  },
];

export const Default: Story = {
  args: {
    crops: mockCrops,
  },
};

export const Empty: Story = {
  args: {
    crops: [],
  },
};

export const ManyCrops: Story = {
  args: {
    crops: [
      ...mockCrops,
      {
        id: '4',
        name: 'Espinacas',
        icon: '🥬',
        plantedDate: '2024-01-20',
        harvestDate: '2024-03-20',
      },
      {
        id: '5',
        name: 'Rábanos',
        icon: '🥕',
        plantedDate: '2024-02-10',
        harvestDate: '2024-04-10',
      },
      {
        id: '6',
        name: 'Zanahorias',
        icon: '🥕',
        plantedDate: '2024-02-15',
        harvestDate: '2024-05-15',
      },
    ],
  },
};
