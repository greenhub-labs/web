import React, { useState } from 'react';
import {
  UserChangePasswordSection,
  UserChangePasswordSectionProps,
} from './user-change-password-section';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * UserChangePasswordSection provides a form for changing the user's password.
 *
 * - Fields for current, new, and confirm password
 * - Toggle visibility for current and new password fields
 * - Submit button with customizable label
 */
const meta: Meta<typeof UserChangePasswordSection> = {
  title: 'Users/Molecules/UserChangePasswordSection',
  component: UserChangePasswordSection,
};
export default meta;

type Story = StoryObj<typeof UserChangePasswordSection>;

const Template = (args: UserChangePasswordSectionProps) => {
  const [fields, setFields] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <UserChangePasswordSection
      {...args}
      current={fields.current}
      new={fields.new}
      confirm={fields.confirm}
      showCurrent={showCurrent}
      showNew={showNew}
      onChange={(field, value) => setFields((f) => ({ ...f, [field]: value }))}
      toggleShowCurrent={() => setShowCurrent((v) => !v)}
      toggleShowNew={() => setShowNew((v) => !v)}
      onSubmit={() => alert('Password changed!')}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    currentLabel: 'Current Password',
    newLabel: 'New Password',
    confirmLabel: 'Confirm Password',
    buttonLabel: 'Change Password',
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
