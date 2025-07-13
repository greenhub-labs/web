import type { Meta, StoryObj } from '@storybook/react';
import LoginPageComponent, { LoginPageComponentProps } from './login-page';
import React from 'react';

const meta: Meta<typeof LoginPageComponent> = {
  title: 'Auth/Pages/LoginPageComponent',
  component: LoginPageComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginPageComponent>;

const mockHandleLogin: LoginPageComponentProps['handleLogin'] = async (
  data,
) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(`Login submitted: ${JSON.stringify(data)}`);
};

export const Default: Story = {
  args: {
    handleLogin: mockHandleLogin,
    loginStatus: 'idle',
  },
};

export const Loading: Story = {
  args: {
    handleLogin: mockHandleLogin,
    loginStatus: 'pending',
  },
};

export const Error: Story = {
  args: {
    handleLogin: mockHandleLogin,
    loginStatus: 'error',
  },
};

export const Success: Story = {
  args: {
    handleLogin: mockHandleLogin,
    loginStatus: 'success',
  },
};
