import type { Meta, StoryObj } from '@storybook/react';
import AuthTemplate from './auth-template';
import React from 'react';

const meta: Meta<typeof AuthTemplate> = {
  title: 'Auth/Templates/AuthTemplate',
  component: AuthTemplate,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AuthTemplate>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ background: '#f3f4f6', padding: 32, borderRadius: 8 }}>
        Auth content goes here
      </div>
    ),
  },
};
