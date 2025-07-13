import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Data & Privacy section (organism).
 * Simulates the loading state of the data privacy section.
 */
export const UserDataPrivacySectionSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" /> {/* Export title */}
        <Skeleton className="h-4 w-56" /> {/* Export description */}
        <Skeleton className="h-10 w-40" /> {/* Export button */}
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" /> {/* Delete title */}
        <Skeleton className="h-4 w-56" /> {/* Delete description */}
        <Skeleton className="h-10 w-40" /> {/* Delete button */}
      </div>
    </div>
  </div>
);
