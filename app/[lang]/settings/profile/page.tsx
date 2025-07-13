'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';

// UI Components
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import { Textarea } from '@/contexts/shared/presentation/components/ui/textarea';
import { Badge } from '@/contexts/shared/presentation/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/contexts/shared/presentation/components/ui/select';
import { Switch } from '@/contexts/shared/presentation/components/ui/switch';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/contexts/shared/presentation/components/ui/avatar';

// Atomic Design Components
import { StatCard } from '@/contexts/shared/presentation/components/atoms/StatCard';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useUser } from '@/contexts/users/presentation/hooks/use-user';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';
import { UserAvatarSection } from '@/contexts/users/presentation/components/molecules/user-avatar-section/user-avatar-section';
import { UserAvatarSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-avatar-section/user-avatar-section-skeleton';
import { UserPersonalInfoSection } from '@/contexts/users/presentation/components/molecules/user-personal-info-section/user-personal-info-section';
import { UserPersonalInfoSectionSkeleton } from '@/contexts/users/presentation/components/molecules/user-personal-info-section/user-personal-info-section-skeleton';

// Icons
import {
  User,
  Camera,
  Shield,
  Settings,
  Download,
  Upload,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Globe2,
  Palette,
  Bell,
  Lock,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { updateUserMutation } = useUser();

  console.log(user);
  const t = useTranslations('pages.profile');
  const tCommon = useTranslations('common');
  const tNavigation = useTranslations('navigation');

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState(user);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

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

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handlePasswordSave = () => {
    // TODO: Implement password change logic
    console.log('Changing password');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleAvatarUpload = (file: File) => {
    if (file) {
      // TODO: Implement avatar upload logic
      console.log('Uploading avatar:', file);
    }
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
          <SettingsSection
            title={t('sections.security.title')}
            subtitle={t('sections.security.subtitle')}
            icon="🔒"
          >
            <div className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h4 className="text-md font-medium">
                  {t('sections.security.changePassword')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('sections.security.currentPassword')}
                    </label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) =>
                          handlePasswordChange('current', e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('sections.security.newPassword')}
                    </label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.new}
                        onChange={(e) =>
                          handlePasswordChange('new', e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('sections.security.confirmPassword')}
                    </label>
                    <Input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) =>
                        handlePasswordChange('confirm', e.target.value)
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handlePasswordSave}
                  className="w-full md:w-auto"
                >
                  {t('actions.changePassword')}
                </Button>
              </div>

              {/* Two Factor Authentication */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium">
                      {t('sections.security.twoFactor')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t('sections.security.twoFactorDescription')}
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Security Alerts */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-md font-medium">
                      {t('sections.security.securityAlerts')}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t('sections.security.securityAlertsDescription')}
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </SettingsSection>

          {/* Data & Privacy */}
          <SettingsSection
            title={t('sections.data.title')}
            subtitle={t('sections.data.subtitle')}
            icon="🗂️"
          >
            <div className="space-y-6">
              {/* Export Data */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="text-md font-medium">
                    {t('sections.data.exportData')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('sections.data.exportDescription')}
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {t('sections.data.downloadData')}
                </Button>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div>
                  <h4 className="text-md font-medium text-destructive">
                    {t('sections.data.deleteAccount')}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t('sections.data.deleteAccountDescription')}
                  </p>
                </div>
                <Button variant="destructive">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {t('sections.data.requestDeletion')}
                </Button>
              </div>
            </div>
          </SettingsSection>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProfilePage;
