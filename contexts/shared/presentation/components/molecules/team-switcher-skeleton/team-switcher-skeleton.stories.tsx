import type { Meta, StoryObj } from '@storybook/react';
import { TeamSwitcherSkeleton } from './team-switcher-skeleton';

const meta: Meta<typeof TeamSwitcherSkeleton> = {
  title: 'Shared/Molecules/TeamSwitcherSkeleton',
  component: TeamSwitcherSkeleton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TeamSwitcherSkeleton>;

export const Default: Story = {
  args: {},
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <TeamSwitcherSkeleton />
    </div>
  ),
};
