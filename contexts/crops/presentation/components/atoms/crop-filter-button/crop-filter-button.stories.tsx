import type { Meta, StoryObj } from '@storybook/react';
import { CropFilterButton } from './crop-filter-button';

const meta: Meta<typeof CropFilterButton> = {
  title: 'Crops/Atoms/CropFilterButton',
  component: CropFilterButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    filter: {
      control: { type: 'select' },
      options: ['all', 'active', 'ready'],
    },
    isActive: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filter: 'all',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    filter: 'active',
    isActive: true,
  },
};

export const AllFilters: Story = {
  render: () => (
    <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
      <CropFilterButton filter="all" isActive={true} onClick={() => {}} />
      <CropFilterButton filter="active" isActive={false} onClick={() => {}} />
      <CropFilterButton filter="ready" isActive={false} onClick={() => {}} />
    </div>
  ),
};
