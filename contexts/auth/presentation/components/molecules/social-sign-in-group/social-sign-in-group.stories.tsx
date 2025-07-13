import React from 'react';
import {
  SocialSignInGroup,
  SocialSignInGroupProps,
} from './social-sign-in-group';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * SocialSignInGroup is a molecule that groups social sign-in buttons in a vertical stack.
 *
 * - Accepts an array of SocialSignInButtonProps
 * - Renders each button with its icon and label
 * - Useful for authentication screens with multiple providers
 */
const meta: Meta<typeof SocialSignInGroup> = {
  title: 'Auth/Molecules/SocialSignInGroup',
  component: SocialSignInGroup,
};
export default meta;

type Story = StoryObj<typeof SocialSignInGroup>;

export const Default: Story = {
  args: {
    buttons: [
      {
        icon: '/icons/social/social-google.svg',
        text: 'Sign in with Google',
        isDisabled: false,
        onClick: () => alert('Google sign in clicked'),
      },
      {
        icon: '/icons/social/dark/social-github.svg',
        text: 'Sign in with GitHub',
        isDisabled: false,
        onClick: () => alert('GitHub sign in clicked'),
      },
      {
        icon: '/icons/social/social-google.svg',
        text: 'Sign in with Google (Disabled)',
        isDisabled: true,
      },
    ],
  },
};
