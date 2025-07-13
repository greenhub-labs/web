'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';

// UI Components
import { Button } from '@/contexts/shared/presentation/components/ui/button';

// Atomic Design Components
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useUser } from '@/contexts/users/presentation/hooks/use-user';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';
import { UserAvatarSection } from '@/contexts/users/presentation/components/molecules/user-avatar-section/user-avatar-section';
import { UserAvatarSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-avatar-section/user-avatar-section-skeleton';
import { UserPersonalInfoSection } from '@/contexts/users/presentation/components/molecules/user-personal-info-section/user-personal-info-section';
import { UserPersonalInfoSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-personal-info-section/user-personal-info-section-skeleton';
import { UserSecuritySettingsSection } from '@/contexts/users/presentation/components/organisms/user-security-settings-section/user-security-settings-section';
import { UserDataPrivacySection } from '@/contexts/users/presentation/components/organisms/user-data-privacy-section/user-data-privacy-section';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { updateUserMutation } = useUser();

  console.log(user);
  const t = useTranslations('pages.profile');
  const tCommon = useTranslations('common');
  const tNavigation = useTranslations('navigation');

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Sync formData with real user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        avatar: user.avatar,
      });
    }
  }, [user]);

  // Handle form updates
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value === '' ? null : value,
      };
    });
  };

  const handleSave = () => {
    // Validate with Zod before updating
    const safeString = (value: unknown) =>
      typeof value === 'string' ? value : undefined;
    const parseResult = userSchema.safeParse({
      id: user?.id || '',
      firstName: safeString(formData?.firstName),
      lastName: safeString(formData?.lastName),
      bio: safeString(formData?.bio),
      avatar: safeString(formData?.avatar),
    });
    if (!parseResult.success) {
      // TODO: Show error to user (for now, log it)
      console.error('Validation error:', parseResult.error.issues);
      return;
    }
    updateUserMutation.mutate(parseResult.data);
    setIsEditing(false);
  };

  const handleAvatarUpload = (file: File) => {
    if (file) {
      // TODO: Implement avatar upload logic
      console.log('Uploading avatar:', file);
    }
  };

  const handleExportData = () => {
    // TODO: Implement export data logic
    console.log('Export data');
  };
  const handleDeleteAccount = () => {
    // TODO: Implement delete account logic
    console.log('Delete account');
  };

  // Breadcrumb configuration
  const breadcrumbItems = [
    {
      label: tNavigation('settings.title'),
      href: '/settings',
    },
  ];

  return (
    <PageTemplate
      pageTitle={tNavigation('settings.profile')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                {tCommon('cancel')}
              </Button>
              <Button onClick={handleSave}>{tCommon('save')}</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              {tCommon('edit')}
            </Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-6">
          {/* Profile Picture Section */}
          <SettingsSection
            title={t('sections.avatar.title')}
            subtitle={t('sections.avatar.subtitle')}
            icon="📷"
          >
            {user ? (
              <UserAvatarSection
                avatarUrl={formData?.avatar || undefined}
                firstName={formData?.firstName || undefined}
                lastName={formData?.lastName || undefined}
                onUpload={handleAvatarUpload}
                onDelete={() => {
                  // TODO: Implement avatar delete logic
                  setFormData((prev) =>
                    prev ? { ...prev, avatar: null } : prev,
                  );
                }}
                uploadLabel={t('sections.avatar.upload')}
                maxSizeText={t('sections.avatar.maxSize')}
                supportedFormatsText={t('sections.avatar.supportedFormats')}
              />
            ) : (
              <UserAvatarSectionSkeleton />
            )}
          </SettingsSection>

          {/* Personal Information */}
          <SettingsSection
            title={t('sections.personalInfo.title')}
            subtitle={t('sections.personalInfo.subtitle')}
            icon="👤"
          >
            {user ? (
              <UserPersonalInfoSection
                firstName={formData?.firstName || ''}
                lastName={formData?.lastName || ''}
                email={formData?.email || ''}
                phone={formData?.phone || ''}
                bio={formData?.bio || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                firstNameLabel={t('sections.personalInfo.firstName')}
                lastNameLabel={t('sections.personalInfo.lastName')}
                emailLabel={t('sections.personalInfo.email')}
                phoneLabel={t('sections.personalInfo.phone')}
                bioLabel={t('sections.personalInfo.bio')}
                bioPlaceholder={t('sections.personalInfo.bioPlaceholder')}
              />
            ) : (
              <UserPersonalInfoSectionSkeleton />
            )}
          </SettingsSection>

          {/* Security Settings */}
          <UserSecuritySettingsSection
            sectionTitle={t('sections.security.title')}
            sectionSubtitle={t('sections.security.subtitle')}
            sectionIcon="🔒"
            changePasswordTitle={t('sections.security.changePassword')}
            currentLabel={t('sections.security.currentPassword')}
            newLabel={t('sections.security.newPassword')}
            confirmLabel={t('sections.security.confirmPassword')}
            buttonLabel={t('actions.changePassword')}
            twoFactorTitle={t('sections.security.twoFactor')}
            twoFactorDescription={t('sections.security.twoFactorDescription')}
            alertsTitle={t('sections.security.securityAlerts')}
            alertsDescription={t('sections.security.securityAlertsDescription')}
          />

          {/* Data & Privacy */}
          <UserDataPrivacySection
            sectionTitle={t('sections.data.title')}
            sectionSubtitle={t('sections.data.subtitle')}
            sectionIcon="🗂️"
            exportTitle={t('sections.data.exportData')}
            exportDescription={t('sections.data.exportDescription')}
            exportButtonLabel={t('sections.data.downloadData')}
            onExport={handleExportData}
            deleteTitle={t('sections.data.deleteAccount')}
            deleteDescription={t('sections.data.deleteAccountDescription')}
            deleteButtonLabel={t('sections.data.requestDeletion')}
            onDelete={handleDeleteAccount}
          />
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProfilePage;
