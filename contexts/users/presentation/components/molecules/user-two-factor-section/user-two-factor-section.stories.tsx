import React, { useState } from 'react';
import {
  UserTwoFactorSection,
  UserTwoFactorSectionProps,
} from './user-two-factor-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserTwoFactorSection toggles two-factor authentication for the user.
 *
 * - Displays a title and description
 * - Switch to enable/disable 2FA
 */
const meta: Meta<typeof UserTwoFactorSection> = {
  title: 'Users/Molecules/UserTwoFactorSection',
  component: UserTwoFactorSection,
};
export default meta;

type Story = StoryObj<typeof UserTwoFactorSection>;

const Template = (args: UserTwoFactorSectionProps) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <UserTwoFactorSection {...args} enabled={enabled} onToggle={setEnabled} />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account.',
  },
};

export const Enabled: Story = {
  render: Template,
  args: {
    ...Default.args,
    description: 'Two-factor authentication is enabled.',
  },
};
