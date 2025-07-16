import type { Meta, StoryObj } from '@storybook/react';
import { TeamSwitcherSection } from './TeamSwitcherSection';

const meta: Meta<typeof TeamSwitcherSection> = {
  title: 'Shared/Organisms/TeamSwitcherSection',
  component: TeamSwitcherSection,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TeamSwitcherSection>;

const exampleTeams = [
  { name: 'Green Valley', logo: '🌾', role: 'Admin' },
  { name: 'Sunny Farm', logo: '🌻', role: 'Member' },
  { name: 'Blue River', logo: '💧', role: 'Viewer' },
];

export const Loaded: Story = {
  args: {
    teams: exampleTeams,
    loading: false,
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <TeamSwitcherSection {...args} />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    teams: [],
    loading: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 400 }}>
      <TeamSwitcherSection {...args} />
    </div>
  ),
};
