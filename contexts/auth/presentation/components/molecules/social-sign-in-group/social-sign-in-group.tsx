import React from 'react';
import {
  SocialSignInButton,
  SocialSignInButtonProps,
} from '../../atoms/social-sign-in-button/social-sign-in-button';

export interface SocialSignInGroupProps {
  buttons: SocialSignInButtonProps[];
  className?: string;
}

/**
 * SocialSignInGroup is a molecule that groups social sign-in buttons in a vertical stack.
 */
export const SocialSignInGroup: React.FC<SocialSignInGroupProps> = ({
  buttons,
  className,
}) => (
  <div className={`flex flex-col gap-4 ${className ?? ''}`}>
    {buttons.map((btn, idx) => (
      <SocialSignInButton key={btn.text + idx} {...btn} />
    ))}
  </div>
);
