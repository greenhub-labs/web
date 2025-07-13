'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';

// UI Components
import { Button } from '@/contexts/shared/presentation/components/ui/button';

// Atomic Design Components
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useUser } from '@/contexts/users/presentation/hooks/use-user';
import { userSchema } from '@/contexts/users/domain/validators/user.schema';
import ProfilePageComponent from '@/contexts/users/presentation/components/pages/profile-page/profile-page';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { updateUserMutation } = useUser();

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(user);

  // Sync formData with real user data when available
  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  // Handle form updates
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev: any) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value === '' ? null : value,
      };
    });
  }, []);

  const handleSave = useCallback(() => {
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
      // Show error to user with Sonner
      console.error('Validation error:', parseResult.error.issues);
      return;
    }
    updateUserMutation.mutate(parseResult.data);
    setIsEditing(false);
  }, [formData, user, updateUserMutation]);

  const handleAvatarUpload = useCallback((file: File) => {
    if (file) {
      // TODO: Implement avatar upload logic
      console.log('Uploading avatar:', file);
    }
  }, []);

  const handleAvatarDelete = useCallback(() => {
    setFormData((prev: any) => (prev ? { ...prev, avatar: null } : prev));
    // TODO: Implement avatar delete logic (API)
  }, []);

  const handleExportData = useCallback(() => {
    // TODO: Implement export data logic
    console.log('Export data');
  }, []);

  const handleDeleteAccount = useCallback(() => {
    // TODO: Implement delete account logic
    console.log('Delete account');
  }, []);

  const handleEdit = useCallback(() => setIsEditing(true), []);
  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setFormData(user);
  }, [user]);

  const isLoading = !user;

  return (
    <ProfilePageComponent
      isEditing={isEditing}
      isLoading={isLoading}
      formData={formData || { id: '' }}
      onSave={handleSave}
      onChange={handleInputChange}
      onAvatarUpload={handleAvatarUpload}
      onAvatarDelete={handleAvatarDelete}
      onExportData={handleExportData}
      onDeleteAccount={handleDeleteAccount}
      onEdit={handleEdit}
      onCancel={handleCancel}
    />
  );
};

export default ProfilePage;
