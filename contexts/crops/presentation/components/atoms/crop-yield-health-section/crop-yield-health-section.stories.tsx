import type { Meta, StoryObj } from '@storybook/react';
import { CropYieldHealthSection } from './crop-yield-health-section';

const meta: Meta<typeof CropYieldHealthSection> = {
  title: 'Crops/Atoms/CropYieldHealthSection',
  component: CropYieldHealthSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentYield: {
      control: { type: 'text' },
    },
    expectedYield: {
      control: { type: 'text' },
    },
    healthScore: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentYield: '0.8kg',
    expectedYield: '2.5kg',
    healthScore: 92,
  },
};

export const HighYield: Story = {
  args: {
    currentYield: '2.0kg',
    expectedYield: '2.5kg',
    healthScore: 95,
  },
};

export const LowHealth: Story = {
  args: {
    currentYield: '0.3kg',
    expectedYield: '1.2kg',
    healthScore: 65,
  },
};
