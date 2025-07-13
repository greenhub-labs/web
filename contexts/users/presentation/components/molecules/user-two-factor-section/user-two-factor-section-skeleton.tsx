import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

/**
 * Skeleton for the Two-Factor Authentication section (molecule).
 * Simulates the loading state of the 2FA section.
 */
export const UserTwoFactorSectionSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-40 mb-2" /> {/* Title */}
    <Skeleton className="h-4 w-64 mb-4" /> {/* Description */}
    <div className="flex gap-2">
      <Skeleton className="h-10 w-28" /> {/* Enable/Disable Button */}
      <Skeleton className="h-10 w-28" /> {/* Backup Codes Button */}
    </div>
  </div>
);
