import type { Meta, StoryObj } from '@storybook/react';
import { CreateCropDialog } from './create-crop-dialog';

const meta: Meta<typeof CreateCropDialog> = {
  title: 'Crops/Organisms/CreateCropDialog',
  component: CreateCropDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    onOpenChange: { action: 'open changed' },
    onCreateCrop: { action: 'crop created' },
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
