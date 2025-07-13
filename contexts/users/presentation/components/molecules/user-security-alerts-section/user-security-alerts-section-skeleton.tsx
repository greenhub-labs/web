import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Security Alerts section (molecule).
 * Simulates the loading state of the security alerts list.
 */
export const UserSecurityAlertsSectionSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-40 mb-2" /> {/* Title */}
    <div className="space-y-2">
      <Skeleton className="h-4 w-64" /> {/* Alert 1 */}
      <Skeleton className="h-4 w-56" /> {/* Alert 2 */}
      <Skeleton className="h-4 w-48" /> {/* Alert 3 */}
    </div>
  </div>
);
