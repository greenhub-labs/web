import type { Meta, StoryObj } from '@storybook/react';
import type { Crop } from '../../molecules/crop-card/crop-card';
import { CropList } from './crop-list';

const meta: Meta<typeof CropList> = {
  title: 'Crops/Organisms/CropList',
  component: CropList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    activeFilter: {
      control: { type: 'select' },
      options: ['all', 'active', 'ready'],
    },
    onFilterChange: { action: 'filter changed' },
    onCreateCrop: { action: 'create crop' },
    onViewCropDetails: { action: 'view details' },
    onEditCrop: { action: 'edit crop' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCrops: Crop[] = [
  {
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
  },
  {
    id: 'crop-2',
    name: 'Albahaca',
    variety: 'Genovese',
    icon: '🌿',
    plotId: 'plot-a',
    plotName: 'Bancal A',
    plantedDate: '2024-01-20',
    harvestDate: '2024-03-30',
    status: 'ready',
    growth: 100,
    expectedYield: '0.8kg',
    currentYield: '0.8kg',
    daysToHarvest: 0,
    healthScore: 88,
    irrigationNeeds: 'low',
    pests: [],
    diseases: [],
    temperature: 22,
    humidity: 65,
  },
  {
    id: 'crop-3',
    name: 'Lechugas',
    variety: 'Batavia',
    icon: '🥬',
    plotId: 'plot-b',
    plotName: 'Bancal B',
    plantedDate: '2024-02-01',
    harvestDate: '2024-04-01',
    status: 'growing',
    growth: 60,
    expectedYield: '1.2kg',
    currentYield: '0.3kg',
    daysToHarvest: 25,
    healthScore: 85,
    irrigationNeeds: 'high',
    pests: ['aphids'],
    diseases: [],
    temperature: 18,
    humidity: 72,
  },
];

export const Default: Story = {
  args: {
    crops: mockCrops,
    activeFilter: 'all',
  },
};

export const ActiveFilter: Story = {
  args: {
    crops: mockCrops,
    activeFilter: 'active',
  },
};

export const ReadyFilter: Story = {
  args: {
    crops: mockCrops,
    activeFilter: 'ready',
  },
};

export const EmptyState: Story = {
  args: {
    crops: [],
    activeFilter: 'all',
  },
};
