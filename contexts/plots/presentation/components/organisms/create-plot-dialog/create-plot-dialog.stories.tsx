import type { Meta, StoryObj } from '@storybook/react';
import { CreatePlotDialog } from './create-plot-dialog';

const meta: Meta<typeof CreatePlotDialog> = {
  title: 'Plots/Organisms/CreatePlotDialog',
  component: CreatePlotDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls the visibility of the dialog',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when dialog open state changes',
    },
    onCreatePlot: {
      action: 'onCreatePlot',
      description: 'Callback when plot creation is submitted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};
