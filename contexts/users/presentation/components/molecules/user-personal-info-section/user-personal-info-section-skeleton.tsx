import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';
import SettingsSection from '@/contexts/shared/presentation/components/molecules/SettingsSection';

export interface UserPersonalInfoSectionSkeletonProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
}

export const UserPersonalInfoSectionSkeleton: React.FC<
  UserPersonalInfoSectionSkeletonProps
> = ({ sectionTitle, sectionSubtitle, sectionIcon }) => {
  return (
    <SettingsSection
      title={sectionTitle}
      subtitle={sectionSubtitle}
      icon={sectionIcon}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        {/* Last Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        {/* Phone */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        {/* Bio */}
        <div className="md:col-span-2 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </SettingsSection>
  );
};
