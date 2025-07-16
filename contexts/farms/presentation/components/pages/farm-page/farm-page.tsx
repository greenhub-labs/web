import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules/SettingsSection';
import { FormField } from '@/contexts/shared/presentation/components/molecules/FormField';
import FarmInfoSection from '../../molecules/farm-info-section/farm-info-section';

interface FarmPageComponentProps {
  farm: Farm | null;
  isEditing: boolean;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSave: () => void;
  handleInputChange: (field: string, value: string) => void;
  formData: Farm | null;
  errors: Record<string, string>;
  isLoading: boolean;
}

const FarmPageComponent = ({
  farm,
  isEditing,
  handleEdit,
  handleCancel,
  handleSave,
  isLoading,
  handleInputChange,
  formData,
  errors,
}: FarmPageComponentProps) => {
  const t = useTranslations();

  const tNavigation = useTranslations('navigation');

  const breadcrumbItems = [
    { label: tNavigation('settings.title'), href: '/settings' },
  ];

  return (
    <PageTemplate
      pageTitle={tNavigation('settings.farm')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        !isEditing ? (
          <Button onClick={handleEdit} disabled={isLoading}>
            {t('common.edit')}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave}>{t('common.save')}</Button>
          </div>
        )
      }
    >
      <FarmInfoSection
        formData={formData || null}
        handleInputChange={handleInputChange}
        errors={errors}
        isEditing={isEditing}
      />
    </PageTemplate>
  );
};

export default FarmPageComponent;
