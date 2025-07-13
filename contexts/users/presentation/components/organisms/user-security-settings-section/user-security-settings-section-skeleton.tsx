import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';
import { UserChangePasswordSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-change-password-section/user-change-password-section-skeleton';
import SettingsSection from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { ToggleSectionSkeleton } from '@/contexts/shared/presentation/components/molecules/toggle-section/toggle-section-skeleton';

export interface UserSecuritySettingsSectionSkeletonProps {
  sectionTitle: string;
  sectionSubtitle: string;
  sectionIcon: string;
}

/**
 * Skeleton for the User Security Settings section (organism).
 * Simulates the loading state of the entire security settings section.
 */
export const UserSecuritySettingsSectionSkeleton: React.FC<
  UserSecuritySettingsSectionSkeletonProps
> = ({ sectionTitle, sectionSubtitle, sectionIcon }) => (
  <SettingsSection
    title={sectionTitle}
    subtitle={sectionSubtitle}
    icon={sectionIcon}
  >
    {/* Change Password */}
    <div className="space-y-4">
      <Skeleton className="h-5 w-32 mb-2" /> {/* Change Password Title */}
      <UserChangePasswordSectionSkeleton />
    </div>
    {/* Two Factor Authentication */}
    <div className="space-y-4 pt-4 border-t">
      <ToggleSectionSkeleton />
    </div>
    {/* Security Alerts */}
    <div className="space-y-4 pt-4 border-t">
      <ToggleSectionSkeleton />
    </div>
  </SettingsSection>
);
