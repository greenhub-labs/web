'use client';

import React, { useState } from 'react';
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

// Mock user data
const mockUser = {
  id: 'user-1',
  firstName: 'María',
  lastName: 'González',
  email: 'maria.gonzalez@example.com',
  phone: '+34 612 345 678',
  bio: 'Passionate about sustainable gardening and smart agriculture technology. I love experimenting with different crops and sharing knowledge with the community.',
  location: 'Valencia, Spain',
  timezone: 'Europe/Madrid',
  language: 'es',
  avatar:
    'https://images.unsplash.com/photo-1494790108755-2616b612c3e0?w=150&h=150&fit=crop&crop=face',
  role: 'admin',
  memberSince: '2023-06-15',
  lastLogin: '2024-01-15T10:30:00Z',
  totalLogins: 156,
};

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  console.log(user);
  const t = useTranslations('pages.profile');
  const tCommon = useTranslations('common');
  const tNavigation = useTranslations('navigation');

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState(mockUser);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Handle form updates
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handlePasswordSave = () => {
    // TODO: Implement password change logic
    console.log('Changing password');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={user?.avatar}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <AvatarFallback className="text-2xl">
                  {user?.firstName?.charAt(0) || ''}
                  {user?.lastName?.charAt(0) || ''}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t('sections.avatar.maxSize')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('sections.avatar.supportedFormats')}
                </p>
              </div>

              <div className="flex gap-2 w-full max-w-xs">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    document.getElementById('avatar-upload')?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t('sections.avatar.upload')}
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
          </SettingsSection>

          {/* Personal Information */}
          <SettingsSection
            title={t('sections.personalInfo.title')}
            subtitle={t('sections.personalInfo.subtitle')}
            icon="👤"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('sections.personalInfo.firstName')}
                </label>
                <Input
                  value={user?.firstName}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('sections.personalInfo.lastName')}
                </label>
                <Input
                  value={user?.lastName}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('sections.personalInfo.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={user?.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('sections.personalInfo.phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={user?.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium">
                  {t('sections.personalInfo.bio')}
                </label>
                <Textarea
                  placeholder={t('sections.personalInfo.bioPlaceholder')}
                  value={user?.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  className="min-h-20"
                />
              </div>
            </div>
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
