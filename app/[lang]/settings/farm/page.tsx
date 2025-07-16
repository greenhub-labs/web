'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { FormField } from '@/contexts/shared/presentation/components/molecules/form-field/form-field';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useFarm } from '@/contexts/farms/presentation/hooks/use-farm';
import { farmSchema } from '@/contexts/farms/domain/validators/farm.schema';
import { farmUpdateSchema } from '@/contexts/farms/domain/validators/farm-update.schema';
import FarmPageComponent from '@/contexts/farms/presentation/components/pages/farm-page/farm-page';
import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';

const FarmSettingsPage: React.FC = () => {
  const t = useTranslations();
  const { user } = useAuth();
  const { currentFarm } = useFarmStore();
  const { updateFarmMutation } = useFarm(currentFarm?.id || '');
  // Estado local para el formulario
  const [formData, setFormData] = useState<any>(currentFarm);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sincroniza el formulario con los datos de la farm
  useEffect(() => {
    if (currentFarm) setFormData(currentFarm);
  }, [currentFarm]);

  // Maneja cambios en los campos
  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  }, []);

  // Validación y guardado (placeholder)
  const handleSave = useCallback(async () => {
    const parseResult = farmUpdateSchema.safeParse({
      ...formData,
      id: currentFarm?.id || '',
      latitude: formData?.latitude ? Number(formData.latitude) : null,
      longitude: formData?.longitude ? Number(formData.longitude) : null,
    });
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        if (issue.path[0])
          fieldErrors[issue.path[0] as string] = t('validation.required');
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      // Merge con currentFarm para cumplir el tipo Farm
      const mergedFarm = {
        ...currentFarm,
        ...parseResult.data,
        // Forzar los campos requeridos a no ser opcionales
        name: parseResult.data.name ?? currentFarm?.name ?? '',
        description:
          parseResult.data.description ?? currentFarm?.description ?? '',
        country: parseResult.data.country ?? currentFarm?.country ?? '',
        state: parseResult.data.state ?? currentFarm?.state ?? '',
        city: parseResult.data.city ?? currentFarm?.city ?? '',
        postalCode:
          parseResult.data.postalCode ?? currentFarm?.postalCode ?? '',
        street: parseResult.data.street ?? currentFarm?.street ?? '',
        latitude: parseResult.data.latitude ?? currentFarm?.latitude ?? null,
        longitude: parseResult.data.longitude ?? currentFarm?.longitude ?? null,
        isActive: currentFarm?.isActive ?? true,
        createdAt: currentFarm?.createdAt ?? '',
        updatedAt: currentFarm?.updatedAt ?? '',
        deletedAt: currentFarm?.deletedAt ?? null,
        members: currentFarm?.members ?? [],
      };
      const updatedFarm = await updateFarmMutation.mutateAsync(mergedFarm);
      setFormData(updatedFarm);
      setIsEditing(false);
      if (updatedFarm && updatedFarm.id) {
        useFarmStore.getState().setCurrentFarm(updatedFarm);
      }
    } catch (error) {
      setErrors({
        general: t('errors.updateFailed', { default: 'Update failed' }),
      });
    }
  }, [formData, currentFarm, t, updateFarmMutation]);

  const handleEdit = useCallback(() => setIsEditing(true), []);
  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setFormData(currentFarm);
    setErrors({});
  }, [currentFarm]);

  const isLoading = !currentFarm;

  return (
    <FarmPageComponent
      farm={currentFarm || null}
      isEditing={isEditing}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleSave={handleSave}
      isLoading={isLoading}
      handleInputChange={handleInputChange}
      formData={formData}
      errors={errors}
    />
  );
};

export default FarmSettingsPage;
