import React from 'react';
import {
  SocialSignInButton,
  SocialSignInButtonProps,
} from './social-sign-in-button';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * SocialSignInButton is a reusable atom for social authentication providers.
 *
 * - Renders a button with an icon and label
 * - Supports disabling and custom click handler
 * - Accepts either a ReactNode or image URL as icon
 */
const meta: Meta<typeof SocialSignInButton> = {
  title: 'Auth/Atoms/SocialSignInButton',
  component: SocialSignInButton,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof SocialSignInButton>;

export const Google: Story = {
  args: {
    icon: '/icons/social/social-google.svg',
    text: 'Sign in with Google',
    isDisabled: false,
    onClick: () => alert('Google sign in clicked'),
  },
};

export const Github: Story = {
  args: {
    icon: '/icons/social/dark/social-github.svg',
    text: 'Sign in with GitHub',
    isDisabled: false,
    onClick: () => alert('GitHub sign in clicked'),
  },
};

export const Disabled: Story = {
  args: {
    icon: '/icons/social/social-google.svg',
    text: 'Sign in with Google',
    isDisabled: true,
  },
};

export const WithImageUrl: Story = {
  args: {
    icon: '/icons/social/social-google.svg',
    text: 'Sign in with Google',
    isDisabled: false,
  },
};
