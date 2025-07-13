import React, { useState } from 'react';
import {
  UserSecurityAlertsSection,
  UserSecurityAlertsSectionProps,
} from './user-security-alerts-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserSecurityAlertsSection toggles security alert notifications for the user.
 *
 * - Displays a title and description
 * - Switch to enable/disable alerts
 */
const meta: Meta<typeof UserSecurityAlertsSection> = {
  title: 'Users/Molecules/UserSecurityAlertsSection',
  component: UserSecurityAlertsSection,
};
export default meta;

type Story = StoryObj<typeof UserSecurityAlertsSection>;

const Template = (args: UserSecurityAlertsSectionProps) => {
  const [enabled, setEnabled] = useState(true);
  return (
    <UserSecurityAlertsSection
      {...args}
      enabled={enabled}
      onToggle={setEnabled}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    title: 'Security Alerts',
    description: 'Receive notifications for important security events.',
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    ...Default.args,
    description: 'Security alerts are currently disabled.',
  },
};
