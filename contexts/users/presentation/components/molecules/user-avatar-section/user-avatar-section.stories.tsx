import React from 'react';
import {
  UserAvatarSection,
  UserAvatarSectionProps,
} from './user-avatar-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserAvatarSection displays the user's avatar with upload and delete actions.
 *
 * - Shows current avatar or initials fallback
 * - Allows uploading a new avatar (image file)
 * - Allows deleting the current avatar
 * - Displays max size and supported formats info
 */
const meta: Meta<typeof UserAvatarSection> = {
  title: 'Users/Molecules/UserAvatarSection',
  component: UserAvatarSection,
  argTypes: {
    onUpload: { action: 'upload' },
    onDelete: { action: 'delete' },
  },
};
export default meta;

type Story = StoryObj<typeof UserAvatarSection>;

export const Default: Story = {
  args: {
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    firstName: 'John',
    lastName: 'Doe',
    uploadLabel: 'Upload Avatar',
    maxSizeText: 'Max size: 2MB',
    supportedFormatsText: 'Supported: JPG, PNG, GIF',
    onUpload: (file: File) => alert(`Uploading: ${file.name}`),
    onDelete: () => alert('Delete avatar'),
  },
};

export const NoAvatar: Story = {
  args: {
    ...Default.args,
    avatarUrl: undefined,
  },
};
