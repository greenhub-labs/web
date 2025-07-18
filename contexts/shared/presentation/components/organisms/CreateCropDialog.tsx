'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/contexts/shared/presentation/components/ui/dialog';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { FormField } from '@/contexts/shared/presentation/components/molecules/form-field/form-field';

interface CreateCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCrop: (cropData: CropFormData) => void;
}

interface CropFormData {
  name: string;
  variety: string;
  plotLocation: string;
  plantingDate: string;
  expectedHarvestDays: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  variety?: string;
  plotLocation?: string;
  plantingDate?: string;
  expectedHarvestDays?: string;
}

export const CreateCropDialog: React.FC<CreateCropDialogProps> = ({
  open,
  onOpenChange,
  onCreateCrop,
}) => {
  const t = useTranslations();

  const [formData, setFormData] = useState<CropFormData>({
    name: '',
    variety: '',
    plotLocation: '',
    plantingDate: '',
    expectedHarvestDays: '',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropTypeOptions = [
    {
      value: 'tomatoes',
      label: t('pages.garden.crops.form.cropTypes.tomatoes'),
    },
    { value: 'lettuce', label: t('pages.garden.crops.form.cropTypes.lettuce') },
    { value: 'carrots', label: t('pages.garden.crops.form.cropTypes.carrots') },
    { value: 'peppers', label: t('pages.garden.crops.form.cropTypes.peppers') },
    { value: 'herbs', label: t('pages.garden.crops.form.cropTypes.herbs') },
    { value: 'beans', label: t('pages.garden.crops.form.cropTypes.beans') },
  ];

  const plotLocationOptions = [
    {
      value: 'plot-a',
      label: t('pages.garden.crops.form.plotLocations.plotA'),
    },
    {
      value: 'plot-b',
      label: t('pages.garden.crops.form.plotLocations.plotB'),
    },
    {
      value: 'plot-c',
      label: t('pages.garden.crops.form.plotLocations.plotC'),
    },
    {
      value: 'plot-d',
      label: t('pages.garden.crops.form.plotLocations.plotD'),
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('pages.garden.crops.form.errors.nameRequired');
    }
    if (!formData.variety.trim()) {
      newErrors.variety = t('pages.garden.crops.form.errors.varietyRequired');
    }
    if (!formData.plotLocation) {
      newErrors.plotLocation = t(
        'pages.garden.crops.form.errors.plotLocationRequired',
      );
    }
    if (!formData.plantingDate) {
      newErrors.plantingDate = t(
        'pages.garden.crops.form.errors.plantingDateRequired',
      );
    }
    if (!formData.expectedHarvestDays.trim()) {
      newErrors.expectedHarvestDays = t(
        'pages.garden.crops.form.errors.expectedHarvestDaysRequired',
      );
    } else if (
      isNaN(Number(formData.expectedHarvestDays)) ||
      Number(formData.expectedHarvestDays) <= 0
    ) {
      newErrors.expectedHarvestDays = t(
        'pages.garden.crops.form.errors.expectedHarvestDaysInvalid',
      );
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await onCreateCrop(formData);

      // Reset form
      setFormData({
        name: '',
        variety: '',
        plotLocation: '',
        plantingDate: '',
        expectedHarvestDays: '',
        notes: '',
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating crop:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: keyof CropFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Format today's date for the date input default
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🌱 {t('pages.garden.crops.form.title')}
          </DialogTitle>
          <DialogDescription>
            {t('pages.garden.crops.form.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label={t('pages.garden.crops.form.cropType')}
            name="name"
            type="select"
            placeholder={t('pages.garden.crops.form.cropTypePlaceholder')}
            value={formData.name}
            onChange={handleFieldChange('name')}
            options={cropTypeOptions}
            error={errors.name}
            required
          />

          <FormField
            label={t('pages.garden.crops.form.variety')}
            name="variety"
            type="text"
            placeholder={t('pages.garden.crops.form.varietyPlaceholder')}
            value={formData.variety}
            onChange={handleFieldChange('variety')}
            error={errors.variety}
            required
          />

          <FormField
            label={t('pages.garden.crops.form.plotLocation')}
            name="plotLocation"
            type="select"
            placeholder={t('pages.garden.crops.form.plotLocationPlaceholder')}
            value={formData.plotLocation}
            onChange={handleFieldChange('plotLocation')}
            options={plotLocationOptions}
            error={errors.plotLocation}
            required
          />

          <FormField
            label={t('pages.garden.crops.form.plantingDate')}
            name="plantingDate"
            type="text"
            placeholder={getTodayDate()}
            value={formData.plantingDate || getTodayDate()}
            onChange={handleFieldChange('plantingDate')}
            error={errors.plantingDate}
            required
          />

          <FormField
            label={t('pages.garden.crops.form.expectedHarvestDays')}
            name="expectedHarvestDays"
            type="number"
            placeholder={t(
              'pages.garden.crops.form.expectedHarvestDaysPlaceholder',
            )}
            value={formData.expectedHarvestDays}
            onChange={handleFieldChange('expectedHarvestDays')}
            error={errors.expectedHarvestDays}
            required
          />

          <FormField
            label={t('pages.garden.crops.form.notes')}
            name="notes"
            type="textarea"
            placeholder={t('pages.garden.crops.form.notesPlaceholder')}
            value={formData.notes}
            onChange={handleFieldChange('notes')}
            rows={3}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>🔄 {t('common.creating')}...</>
              ) : (
                <>🌱 {t('pages.garden.crops.form.plant')}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
