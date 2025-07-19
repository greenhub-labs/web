import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';

export interface StatusBadgeProps {
  status: string;
  label: string;
  icon: string;
  color: string;
  className?: string;
  showTextOnMobile?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  icon,
  color,
  className,
  showTextOnMobile = false,
}) => {
  return (
    <Badge className={cn(color, 'text-xs shrink-0', className)}>
      {icon}{' '}
      <span className={showTextOnMobile ? '' : 'hidden sm:inline'}>
        {label}
      </span>
    </Badge>
  );
};

export default StatusBadge;
