import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ProfilePageComponent, {
  ProfilePageComponentProps,
} from './profile-page';

const meta: Meta<typeof ProfilePageComponent> = {
  title: 'Users/Pages/ProfilePageComponent',
  component: ProfilePageComponent,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof ProfilePageComponent>;

const baseFormData = {
  id: '1',
  firstName: 'Jane',
  lastName: 'Doe',
  bio: 'Enthusiastic gardener and automation lover.',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  email: 'jane.doe@example.com',
  phone: '+34123456789',
};

const noop = () => {};

export const Loading: Story = {
  args: {
    isEditing: false,
    isLoading: false,
    formData: { id: '' },
    onSave: noop,
    onChange: noop,
    onAvatarUpload: noop,
    onAvatarDelete: noop,
    onExportData: noop,
    onDeleteAccount: noop,
    onEdit: noop,
    onCancel: noop,
  },
};

export const View: Story = {
  args: {
    isEditing: false,
    isLoading: false,
    formData: baseFormData,
    onSave: noop,
    onChange: noop,
    onAvatarUpload: noop,
    onAvatarDelete: noop,
    onExportData: noop,
    onDeleteAccount: noop,
    onEdit: noop,
    onCancel: noop,
  },
};

export const Edit: Story = {
  args: {
    isEditing: true,
    isLoading: false,
    formData: baseFormData,
    onSave: noop,
    onChange: noop,
    onAvatarUpload: noop,
    onAvatarDelete: noop,
    onExportData: noop,
    onDeleteAccount: noop,
    onEdit: noop,
    onCancel: noop,
  },
};
