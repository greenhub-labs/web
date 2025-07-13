import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Data & Privacy section (organism).
 * Matches the structure and sizing of the loaded component.
 */
export const UserDataPrivacySectionSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Export Data Skeleton */}
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
      <div>
        <Skeleton className="h-5 w-32 mb-2" /> {/* Export title */}
        <Skeleton className="h-4 w-56" /> {/* Export description */}
      </div>
      <Skeleton className="h-10 w-40" /> {/* Export button */}
    </div>

    {/* Delete Account Skeleton */}
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
      <div>
        <Skeleton className="h-5 w-32 mb-2" /> {/* Delete title */}
        <Skeleton className="h-4 w-56" /> {/* Delete description */}
      </div>
      <Skeleton className="h-10 w-40" /> {/* Delete button */}
    </div>
  </div>
);
