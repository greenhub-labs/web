import type { Meta, StoryObj } from '@storybook/react';
import { CropEnvironmentalData } from './crop-environmental-data';

const meta: Meta<typeof CropEnvironmentalData> = {
  title: 'Crops/Atoms/CropEnvironmentalData',
  component: CropEnvironmentalData,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    temperature: {
      control: { type: 'number', min: -10, max: 50 },
    },
    humidity: {
      control: { type: 'number', min: 0, max: 100 },
    },
    irrigationNeeds: {
      control: { type: 'select' },
      options: ['high', 'medium', 'low'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    temperature: 24,
    humidity: 68,
    irrigationNeeds: 'medium',
  },
};

export const HighIrrigation: Story = {
  args: {
    temperature: 28,
    humidity: 45,
    irrigationNeeds: 'high',
  },
};

export const LowIrrigation: Story = {
  args: {
    temperature: 18,
    humidity: 75,
    irrigationNeeds: 'low',
  },
};
