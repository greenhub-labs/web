import type { Meta, StoryObj } from '@storybook/react';
import { CropFilterGroup } from './crop-filter-group';

const meta: Meta<typeof CropFilterGroup> = {
  title: 'Crops/Molecules/CropFilterGroup',
  component: CropFilterGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeFilter: {
      control: { type: 'select' },
      options: ['all', 'active', 'ready'],
    },
    onFilterChange: { action: 'filter changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeFilter: 'all',
  },
};

export const ActiveFilter: Story = {
  args: {
    activeFilter: 'active',
  },
};

export const ReadyFilter: Story = {
  args: {
    activeFilter: 'ready',
  },
};
