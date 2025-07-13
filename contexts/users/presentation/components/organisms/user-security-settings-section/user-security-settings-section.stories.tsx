import React from 'react';
import {
  UserSecuritySettingsSection,
  UserSecuritySettingsSectionProps,
} from './user-security-settings-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserSecuritySettingsSection provides a full section for user security settings.
 *
 * - Change password (with visibility toggles)
 * - Enable/disable two-factor authentication
 * - Enable/disable security alerts
 * - All state is managed locally for demonstration
 */
const meta: Meta<typeof UserSecuritySettingsSection> = {
  title: 'Users/Organisms/UserSecuritySettingsSection',
  component: UserSecuritySettingsSection,
};
export default meta;

type Story = StoryObj<typeof UserSecuritySettingsSection>;

export const Default: Story = {
  args: {
    sectionTitle: 'Security Settings',
    sectionSubtitle:
      'Manage your password, two-factor authentication, and security alerts.',
    sectionIcon: 'lock',
    changePasswordTitle: 'Change Password',
    currentLabel: 'Current Password',
    newLabel: 'New Password',
    confirmLabel: 'Confirm Password',
    buttonLabel: 'Change Password',
    twoFactorTitle: 'Two-Factor Authentication',
    twoFactorDescription: 'Add an extra layer of security to your account.',
    alertsTitle: 'Security Alerts',
    alertsDescription: 'Receive notifications for important security events.',
  },
};
