import type { Meta, StoryObj } from '@storybook/react';
import RegisterPageComponent, {
  RegisterPageComponentProps,
} from './register-page';
import React from 'react';

const meta: Meta<typeof RegisterPageComponent> = {
  title: 'Auth/Pages/RegisterPageComponent',
  component: RegisterPageComponent,
  tags: ['autodocs'],
  parameters: {
    controls: { hideNoControlsWarning: true, disabled: true },
    actions: { disabled: true },
    backgrounds: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof RegisterPageComponent>;

const mockHandleRegister: RegisterPageComponentProps['handleRegister'] = async (
  data,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(`Register submitted: ${JSON.stringify(data)}`);
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
