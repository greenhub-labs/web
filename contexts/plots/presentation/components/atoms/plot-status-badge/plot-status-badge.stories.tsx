import type { Meta, StoryObj } from '@storybook/react';
import { PlotStatusBadge } from './plot-status-badge';

const meta: Meta<typeof PlotStatusBadge> = {
  title: 'Plots/Atoms/PlotStatusBadge',
  component: PlotStatusBadge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A status badge component specifically designed for plot statuses with appropriate colors and icons.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    status: 'active',
  },
};

export const Inactive: Story = {
  args: {
    status: 'inactive',
  },
};

export const Preparing: Story = {
  args: {
    status: 'preparing',
  },
};

export const Resting: Story = {
  args: {
    status: 'resting',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PlotStatusBadge status="active" />
      <PlotStatusBadge status="inactive" />
      <PlotStatusBadge status="preparing" />
      <PlotStatusBadge status="resting" />
    </div>
  ),
};
