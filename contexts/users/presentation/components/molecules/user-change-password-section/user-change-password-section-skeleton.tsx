import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Change Password section (molecule).
 * Simulates the loading state of the change password form.
 */
export const UserChangePasswordSectionSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-40 mb-2" /> {/* Title */}
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" /> {/* Current password label */}
      <Skeleton className="h-10 w-full" /> {/* Current password input */}
      <Skeleton className="h-4 w-32" /> {/* New password label */}
      <Skeleton className="h-10 w-full" /> {/* New password input */}
      <Skeleton className="h-4 w-32" /> {/* Confirm password label */}
      <Skeleton className="h-10 w-full" /> {/* Confirm password input */}
    </div>
    <div className="flex justify-end">
      <Skeleton className="h-10 w-28" /> {/* Button */}
    </div>
  </div>
);
