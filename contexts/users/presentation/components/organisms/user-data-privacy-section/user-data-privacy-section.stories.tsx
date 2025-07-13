import React from 'react';
import {
  UserDataPrivacySection,
  UserDataPrivacySectionProps,
} from './user-data-privacy-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserDataPrivacySection provides controls for exporting user data and deleting the account.
 *
 * - Export data (with customizable button and description)
 * - Delete account (with warning and destructive button)
 * - All actions use mock handlers for demonstration
 */
const meta: Meta<typeof UserDataPrivacySection> = {
  title: 'Users/Organisms/UserDataPrivacySection',
  component: UserDataPrivacySection,
  argTypes: {
    onExport: { action: 'export' },
    onDelete: { action: 'delete' },
  },
};
export default meta;

type Story = StoryObj<typeof UserDataPrivacySection>;

export const Default: Story = {
  args: {
    sectionTitle: 'Data & Privacy',
    sectionSubtitle: 'Export your data or delete your account permanently.',
    sectionIcon: '🗂️',
    exportTitle: 'Export Data',
    exportDescription: 'Download all your personal data in a single file.',
    exportButtonLabel: 'Export Data',
    onExport: () => alert('Exporting data...'),
    deleteTitle: 'Delete Account',
    deleteDescription:
      'This action is irreversible. All your data will be permanently deleted.',
    deleteButtonLabel: 'Delete Account',
    onDelete: () => alert('Account deleted!'),
  },
};
