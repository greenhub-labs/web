import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Change Password section (molecule).
 * Matches the structure and sizing of the loaded component.
 */
export const UserChangePasswordSectionSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Current password */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-24 mb-1" /> {/* Label */}
        <div className="relative">
          <Skeleton className="h-9 w-full" /> {/* Input */}
          <Skeleton className="h-5 w-5 rounded-full absolute right-2 top-1/2 -translate-y-1/2" />{' '}
          {/* Eye icon */}
        </div>
      </div>
      {/* New password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 mb-1" /> {/* Label */}
        <div className="relative">
          <Skeleton className="h-9 w-full" /> {/* Input */}
          <Skeleton className="h-5 w-5 rounded-full absolute right-2 top-1/2 -translate-y-1/2" />{' '}
          {/* Eye icon */}
        </div>
      </div>
      {/* Confirm password */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 mb-1" /> {/* Label */}
        <Skeleton className="h-9 w-full" /> {/* Input */}
      </div>
    </div>
    <Skeleton className="h-10 w-full md:w-32" /> {/* Button */}
  </div>
);
