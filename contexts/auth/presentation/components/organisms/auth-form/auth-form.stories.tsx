import React from 'react';
import { AuthForm, AuthFormProps } from './auth-form';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * AuthForm is an organism for user authentication (login/signup).
 *
 * - Supports login and signup modes
 * - Validates fields and shows errors
 * - Includes social sign-in buttons with SVG icons
 * - Uses mock handlers for demonstration
 */
const meta: Meta<typeof AuthForm> = {
  title: 'Auth/Organisms/AuthForm',
  component: AuthForm,
};
export default meta;

type Story = StoryObj<typeof AuthForm>;

export const Login: Story = {
  args: {
    mode: 'login',
    switchUrl: '/register',
    switchText: "Don't have an account? Sign up",
    isLoading: false,
    onSubmit: async (data) => {
      alert('Login submitted: ' + JSON.stringify(data));
    },
  },
};

export const Signup: Story = {
  args: {
    mode: 'signup',
    switchUrl: '/login',
    switchText: 'Already have an account? Log in',
    isLoading: false,
    onSubmit: async (data) => {
      alert('Signup submitted: ' + JSON.stringify(data));
    },
  },
};

export const Loading: Story = {
  args: {
    ...Login.args,
    isLoading: true,
  },
};
