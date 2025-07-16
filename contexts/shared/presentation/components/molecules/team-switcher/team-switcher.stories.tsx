import type { Meta, StoryObj } from '@storybook/react';
import { TeamSwitcher } from './team-switcher';

const meta: Meta<typeof TeamSwitcher> = {
  title: 'Shared/Molecules/TeamSwitcher',
  component: TeamSwitcher,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TeamSwitcher>;

export const Default: Story = {
  args: {
    teams: [
      {
        name: 'Green Valley',
        logo: '🌾',
        role: 'Admin',
      },
      {
        name: 'Sunny Farm',
        logo: '🌻',
        role: 'Member',
      },
      {
        name: 'Blue River',
        logo: '💧',
        role: 'Viewer',
      },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: 600 }}>
      <TeamSwitcher {...args} />
    </div>
  ),
};
