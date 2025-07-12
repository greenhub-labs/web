import { Button } from '@/contexts/shared/presentation/components/ui/button';
import Image from 'next/image';
import React from 'react';

export interface SocialSignInButtonProps {
  icon: React.ReactNode | string;
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * SocialSignInButton is a reusable atom for social authentication providers.
 */
export const SocialSignInButton: React.FC<SocialSignInButtonProps> = ({
  icon,
  text,
  isDisabled = false,
  onClick,
  className,
}) => (
  <Button
    variant="outline"
    className={`w-full flex items-center justify-center ${className ?? ''}`}
    onClick={onClick}
    type="button"
    disabled={isDisabled}
  >
    {typeof icon === 'string' ? (
      <Image
        src={icon}
        alt={text}
        width={24}
        height={24}
        className="mr-2 flex items-center"
      />
    ) : (
      icon
    )}
    {text}
  </Button>
);
