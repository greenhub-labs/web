import type { Meta, StoryObj } from '@storybook/react';
import { CropCard, type Crop } from './crop-card';

const meta: Meta<typeof CropCard> = {
  title: 'Crops/Molecules/CropCard',
  component: CropCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCrop: Crop = {
  id: 'crop-1',
  name: 'Tomates Cherry',
  variety: 'Sweet 100',
  icon: '🍅',
  plotId: 'plot-a',
  plotName: 'Bancal A',
  plantedDate: '2024-01-15',
  harvestDate: '2024-04-15',
  status: 'flowering',
  growth: 75,
  expectedYield: '2.5kg',
  currentYield: '0.8kg',
  daysToHarvest: 12,
  healthScore: 92,
  irrigationNeeds: 'medium',
  pests: [],
  diseases: [],
  temperature: 24,
  humidity: 68,
};

const mockActions = [
  {
    label: 'View Details',
    icon: '👁️',
    onClick: () => console.log('View details'),
    variant: 'outline' as const,
    isPrimary: true,
  },
  {
    label: 'Edit',
    icon: '⚙️',
    onClick: () => console.log('Edit'),
    variant: 'outline' as const,
  },
];

export const Default: Story = {
  args: {
    crop: mockCrop,
    actions: mockActions,
  },
};

export const WithPests: Story = {
  args: {
    crop: {
      ...mockCrop,
      pests: ['aphids'],
      diseases: [],
    },
    actions: mockActions,
  },
};

export const WithDiseases: Story = {
  args: {
    crop: {
      ...mockCrop,
      pests: [],
      diseases: ['powdery mildew'],
    },
    actions: mockActions,
  },
};

export const ReadyToHarvest: Story = {
  args: {
    crop: {
      ...mockCrop,
      status: 'ready',
      growth: 100,
      daysToHarvest: 0,
      currentYield: '2.5kg',
    },
    actions: mockActions,
  },
};
