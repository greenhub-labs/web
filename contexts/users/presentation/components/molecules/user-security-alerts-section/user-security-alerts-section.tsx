import React from 'react';
import { Switch } from '@/contexts/shared/presentation/components/ui/switch';

export interface UserSecurityAlertsSectionProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

export const UserSecurityAlertsSection: React.FC<
  UserSecurityAlertsSectionProps
> = ({ title, description, enabled, onToggle }) => {
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
