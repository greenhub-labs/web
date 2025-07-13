import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';
import SettingsSection from '@/contexts/shared/presentation/components/molecules/SettingsSection';

export interface UserAvatarSectionSkeletonProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
}

export const UserAvatarSectionSkeleton: React.FC<
  UserAvatarSectionSkeletonProps
> = ({ sectionTitle, sectionSubtitle, sectionIcon }) => {
  return (
    <SettingsSection
      title={sectionTitle}
      subtitle={sectionSubtitle}
      icon={sectionIcon}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar Skeleton */}
        <Skeleton className="h-32 w-32 rounded-full" />

        {/* Texts Skeleton */}
        <div className="text-center space-y-2 w-40">
          <div className="flex flex-col h-6">
            <Skeleton className="h-4 w-full mx-auto" />
          </div>
          <div className="flex flex-col h-6">
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2 w-full max-w-xs">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </SettingsSection>
  );
};
