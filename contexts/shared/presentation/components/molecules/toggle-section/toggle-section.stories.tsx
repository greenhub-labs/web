import React, { useState } from 'react';
import { ToggleSection, ToggleSectionProps } from './toggle-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * ToggleSection is a generic molecule for any setting with a title, description, and switch.
 *
 * - Displays a title and description
 * - Switch to enable/disable the setting
 */
const meta: Meta<typeof ToggleSection> = {
  title: 'Shared/Molecules/ToggleSection',
  component: ToggleSection,
};
export default meta;

type Story = StoryObj<typeof ToggleSection>;

const Template = (args: ToggleSectionProps) => {
  const [enabled, setEnabled] = useState(args.enabled ?? false);
  return <ToggleSection {...args} enabled={enabled} onToggle={setEnabled} />;
};

export const SecurityAlerts: Story = {
  render: Template,
  args: {
    title: 'Security Alerts',
    description: 'Receive notifications for important security events.',
    enabled: true,
  },
};

export const TwoFactorAuth: Story = {
  render: Template,
  args: {
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account.',
    enabled: false,
  },
};
