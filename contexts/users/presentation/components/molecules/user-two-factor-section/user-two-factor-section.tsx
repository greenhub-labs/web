import React from 'react';
import { Switch } from '@/contexts/shared/presentation/components/ui/switch';

export interface UserTwoFactorSectionProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export const UserTwoFactorSection: React.FC<UserTwoFactorSectionProps> = ({
  title,
  description,
  enabled,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-md font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
};
