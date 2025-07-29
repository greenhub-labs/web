import type { Meta, StoryObj } from '@storybook/react';
import { CropsPage } from './crops-page';

const meta: Meta<typeof CropsPage> = {
  title: 'Crops/Pages/CropsPage',
  component: CropsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
