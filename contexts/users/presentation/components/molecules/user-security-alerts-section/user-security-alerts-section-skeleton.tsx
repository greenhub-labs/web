import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Security Alerts section (molecule).
 * Matches the structure and sizing of the loaded component.
 */
export const UserSecurityAlertsSectionSkeleton: React.FC = () => (
  <div className="flex items-center justify-between">
    <div>
      <Skeleton className="h-5 w-32 mb-2" /> {/* Title */}
      <Skeleton className="h-4 w-48" /> {/* Description */}
    </div>
    <Skeleton className="h-6 w-12 rounded-full" /> {/* Switch */}
  </div>
);
