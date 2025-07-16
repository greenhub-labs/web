import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CreateFarmDialog, FarmFormData } from './create-farm-dialog';

const meta: Meta<typeof CreateFarmDialog> = {
  title: 'Farms/Organisms/CreateFarmDialog',
  component: CreateFarmDialog,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CreateFarmDialog>;

const mockFarmData: FarmFormData = {
  name: 'Green Valley Farm',
  description: 'A beautiful organic farm in Andalusia.',
  country: 'Spain',
  state: 'Andalusia',
  city: 'Seville',
  postalCode: '41001',
  street: '123 Olive Road',
  latitude: '37.7749',
  longitude: '-122.4194',
};

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <CreateFarmDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onCreateFarm={async (data) => {
          // eslint-disable-next-line no-alert
          alert('Farm created!\n' + JSON.stringify(data, null, 2));
        }}
      />
    );
  },
  args: {
    open: true,
    onOpenChange: () => {},
    onCreateFarm: async () => {},
  },
};
