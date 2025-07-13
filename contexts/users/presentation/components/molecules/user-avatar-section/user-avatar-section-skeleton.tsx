import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';

export const UserAvatarSectionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Skeleton */}
      <Skeleton className="h-32 w-32 rounded-full" />

      {/* Texts Skeleton */}
      <div className="text-center space-y-2 w-40">
        <Skeleton className="h-4 w-full mx-auto" />
        <Skeleton className="h-3 w-3/4 mx-auto" />
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-2 w-full max-w-xs">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );
};
