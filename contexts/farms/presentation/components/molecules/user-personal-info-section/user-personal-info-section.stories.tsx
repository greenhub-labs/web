import React, { useState } from 'react';
import {
  UserPersonalInfoSection,
  UserPersonalInfoSectionProps,
} from './user-personal-info-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserPersonalInfoSection displays and edits user's personal information.
 *
 * - Fields: first name, last name, email, phone, bio
 * - All fields are editable and support disabling
 * - Bio uses a textarea with placeholder
 */
const meta: Meta<typeof UserPersonalInfoSection> = {
  title: 'Users/Molecules/UserPersonalInfoSection',
  component: UserPersonalInfoSection,
};
export default meta;

type Story = StoryObj<typeof UserPersonalInfoSection>;

const Template = (args: UserPersonalInfoSectionProps) => {
  const [fields, setFields] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    bio: 'Gardener and automation enthusiast.',
  });
  return (
    <UserPersonalInfoSection
      {...args}
      {...fields}
      onChange={(field, value) => setFields((f) => ({ ...f, [field]: value }))}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    firstNameLabel: 'First Name',
    lastNameLabel: 'Last Name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    bioLabel: 'Bio',
    bioPlaceholder: 'Tell us about yourself...',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
};
