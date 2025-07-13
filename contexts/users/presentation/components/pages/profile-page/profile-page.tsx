import React from 'react';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { UserAvatarSection } from '@/contexts/users/presentation/components/molecules/user-avatar-section/user-avatar-section';
import { UserAvatarSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-avatar-section/user-avatar-section-skeleton';
import { UserPersonalInfoSection } from '@/contexts/users/presentation/components/molecules/user-personal-info-section/user-personal-info-section';
import { UserPersonalInfoSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-personal-info-section/user-personal-info-section-skeleton';
import { UserSecuritySettingsSection } from '@/contexts/users/presentation/components/organisms/user-security-settings-section/user-security-settings-section';
import { UserSecuritySettingsSectionSkeleton } from '@/contexts/users/presentation/components/organisms/user-security-settings-section/user-security-settings-section-skeleton';
import { UserDataPrivacySection } from '@/contexts/users/presentation/components/organisms/user-data-privacy-section/user-data-privacy-section';
import { UserDataPrivacySectionSkeleton } from '@/contexts/users/presentation/components/organisms/user-data-privacy-section/user-data-privacy-section-skeleton';
import { useTranslations } from 'next-intl';

export interface ProfilePageComponentProps {
  isEditing: boolean;
  isLoading: boolean;
  formData: {
    id: string;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    bio?: string | null | undefined;
    avatar?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
  };
  onSave: () => void;
  onChange: (field: string, value: string) => void;
  onAvatarUpload: (file: File) => void;
  onAvatarDelete: () => void;
  onExportData: () => void;
  onDeleteAccount: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

const ProfilePageComponent: React.FC<ProfilePageComponentProps> = ({
  isEditing,
  isLoading,
  formData,
  onSave,
  onChange,
  onAvatarUpload,
  onAvatarDelete,
  onExportData,
  onDeleteAccount,
  onEdit,
  onCancel,
}) => {
  const t = useTranslations('pages.profile');
  const tCommon = useTranslations('common');
  const tNavigation = useTranslations('navigation');

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
              <Button variant="outline" onClick={onCancel}>
                {tCommon('cancel')}
              </Button>
              <Button onClick={onSave}>{tCommon('save')}</Button>
            </>
          ) : (
            <Button onClick={onEdit}>{tCommon('edit')}</Button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Picture Section */}
        {isLoading ? (
          <UserAvatarSectionSkeleton
            sectionTitle={t('sections.avatar.title')}
            sectionSubtitle={t('sections.avatar.subtitle')}
            sectionIcon="📷"
          />
        ) : (
          <UserAvatarSection
            sectionTitle={t('sections.avatar.title')}
            sectionSubtitle={t('sections.avatar.subtitle')}
            sectionIcon="📷"
            avatarUrl={formData?.avatar || undefined}
            firstName={formData?.firstName || undefined}
            lastName={formData?.lastName || undefined}
            onUpload={onAvatarUpload}
            onDelete={onAvatarDelete}
            uploadLabel={t('sections.avatar.upload')}
            maxSizeText={t('sections.avatar.maxSize')}
            supportedFormatsText={t('sections.avatar.supportedFormats')}
          />
        )}

        {/* Personal Information */}
        {isLoading ? (
          <UserPersonalInfoSectionSkeleton
            sectionTitle={t('sections.personalInfo.title')}
            sectionSubtitle={t('sections.personalInfo.subtitle')}
            sectionIcon="👤"
          />
        ) : (
          <UserPersonalInfoSection
            sectionTitle={t('sections.personalInfo.title')}
            sectionSubtitle={t('sections.personalInfo.subtitle')}
            sectionIcon="👤"
            firstName={formData?.firstName || ''}
            lastName={formData?.lastName || ''}
            email={formData?.email || ''}
            phone={formData?.phone || ''}
            bio={formData?.bio || ''}
            onChange={onChange}
            disabled={!isEditing}
            firstNameLabel={t('sections.personalInfo.firstName')}
            lastNameLabel={t('sections.personalInfo.lastName')}
            emailLabel={t('sections.personalInfo.email')}
            phoneLabel={t('sections.personalInfo.phone')}
            bioLabel={t('sections.personalInfo.bio')}
            bioPlaceholder={t('sections.personalInfo.bioPlaceholder')}
          />
        )}

        {/* Security Settings */}
        {isLoading ? (
          <UserSecuritySettingsSectionSkeleton
            sectionTitle={t('sections.security.title')}
            sectionSubtitle={t('sections.security.subtitle')}
            sectionIcon="🔒"
          />
        ) : (
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
        )}

        {/* Data & Privacy */}
        {isLoading ? (
          <UserDataPrivacySectionSkeleton
            sectionTitle={t('sections.data.title')}
            sectionSubtitle={t('sections.data.subtitle')}
            sectionIcon="🗂️"
          />
        ) : (
          <UserDataPrivacySection
            sectionTitle={t('sections.data.title')}
            sectionSubtitle={t('sections.data.subtitle')}
            sectionIcon="🗂️"
            exportTitle={t('sections.data.exportData')}
            exportDescription={t('sections.data.exportDescription')}
            exportButtonLabel={t('sections.data.downloadData')}
            onExport={onExportData}
            deleteTitle={t('sections.data.deleteAccount')}
            deleteDescription={t('sections.data.deleteAccountDescription')}
            deleteButtonLabel={t('sections.data.requestDeletion')}
            onDelete={onDeleteAccount}
          />
        )}
      </div>
    </PageTemplate>
  );
};

export default ProfilePageComponent;
