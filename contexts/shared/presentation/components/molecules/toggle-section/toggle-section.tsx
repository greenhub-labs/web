import React from 'react';
import { Switch } from '@/contexts/shared/presentation/components/ui/switch';

export interface ToggleSectionProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
}

/**
 * ToggleSection is a generic molecule for any setting with a title, description, and switch.
 */
export const ToggleSection: React.FC<ToggleSectionProps> = ({
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
