import React from 'react';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';
import { UserChangePasswordSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-change-password-section/user-change-password-section-skeleton';
import { UserTwoFactorSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-two-factor-section/user-two-factor-section-skeleton';
import { UserSecurityAlertsSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-security-alerts-section/user-security-alerts-section-skeleton';

/**
 * Skeleton for the User Security Settings section (organism).
 * Simulates the loading state of the entire security settings section.
 */
export const UserSecuritySettingsSectionSkeleton: React.FC = () => (
  <div className="space-y-6">
    {/* Change Password */}
    <div className="space-y-4">
      <Skeleton className="h-5 w-32 mb-2" /> {/* Change Password Title */}
      <UserChangePasswordSectionSkeleton />
    </div>
    {/* Two Factor Authentication */}
    <div className="space-y-4 pt-4 border-t">
      <UserTwoFactorSectionSkeleton />
    </div>
    {/* Security Alerts */}
    <div className="space-y-4 pt-4 border-t">
      <UserSecurityAlertsSectionSkeleton />
    </div>
  </div>
);
