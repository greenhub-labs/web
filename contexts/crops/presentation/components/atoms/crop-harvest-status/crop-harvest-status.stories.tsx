import type { Meta, StoryObj } from '@storybook/react';
import { CropHarvestStatus } from './crop-harvest-status';

const meta: Meta<typeof CropHarvestStatus> = {
  title: 'Crops/Atoms/CropHarvestStatus',
  component: CropHarvestStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    daysToHarvest: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    daysToHarvest: 12,
  },
};

export const ReadyToHarvest: Story = {
  args: {
    daysToHarvest: 0,
  },
};

export const LongTimeToHarvest: Story = {
  args: {
    daysToHarvest: 45,
  },
};
