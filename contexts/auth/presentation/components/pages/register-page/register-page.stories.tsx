import type { Meta, StoryObj } from '@storybook/react';
import LoginPageComponent, {
  RegisterPageComponentProps,
} from './register-page';
import React from 'react';

const meta: Meta<typeof LoginPageComponent> = {
  title: 'Auth/Pages/LoginPageComponent',
  component: LoginPageComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginPageComponent>;

const mockHandleRegister: RegisterPageComponentProps['handleRegister'] = async (
  data,
) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(`Login submitted: ${JSON.stringify(data)}`);
};

export const Default: Story = {
  args: {
    handleRegister: mockHandleRegister,
    registerStatus: 'idle',
  },
};

export const Loading: Story = {
  args: {
    handleRegister: mockHandleRegister,
    registerStatus: 'pending',
  },
};

export const Error: Story = {
  args: {
    handleRegister: mockHandleRegister,
    registerStatus: 'error',
  },
};

export const Success: Story = {
  args: {
    handleRegister: mockHandleRegister,
    registerStatus: 'success',
  },
};
