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

interface CreateFarmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFarm: (farmData: FarmFormData) => Promise<void>;
}

export interface FarmFormData {
  name: string;
  description: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  street: string;
  latitude: string;
  longitude: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export const CreateFarmDialog: React.FC<CreateFarmDialogProps> = ({
  open,
  onOpenChange,
  onCreateFarm,
}) => {
  const t = useTranslations();

  const [formData, setFormData] = useState<FarmFormData>({
    name: '',
    description: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    street: '',
    latitude: '',
    longitude: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    // TODO: Validate form data
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await onCreateFarm(formData);
      setFormData({
        name: '',
        description: '',
        country: '',
        state: '',
        city: '',
        postalCode: '',
        street: '',
        latitude: '',
        longitude: '',
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error creating farm:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: keyof FarmFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full sm:max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🌾 {t('pages.settings.farm.create.title')}
          </DialogTitle>
          <DialogDescription>
            {t('pages.settings.farm.create.description', {
              default: 'Fill in the details to create a new farm.',
            })}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label={t('pages.settings.farm.name')}
            name="name"
            type="text"
            placeholder={t('pages.settings.farm.namePlaceholder', {
              default: 'e.g. Green Valley Farm',
            })}
            value={formData.name}
            onChange={handleFieldChange('name')}
            error={errors.name}
            required
          />
          <FormField
            label={t('pages.settings.farm.description')}
            name="description"
            type="textarea"
            placeholder={t('pages.settings.farm.descriptionPlaceholder', {
              default: 'Describe your farm...',
            })}
            value={formData.description}
            onChange={handleFieldChange('description')}
            error={errors.description}
          />
          <FormField
            label={t('pages.settings.farm.country')}
            name="country"
            type="text"
            placeholder={t('pages.settings.farm.countryPlaceholder', {
              default: 'e.g. Spain',
            })}
            value={formData.country}
            onChange={handleFieldChange('country')}
            error={errors.country}
            required
          />
          <FormField
            label={t('pages.settings.farm.state')}
            name="state"
            type="text"
            placeholder={t('pages.settings.farm.statePlaceholder', {
              default: 'e.g. Andalusia',
            })}
            value={formData.state}
            onChange={handleFieldChange('state')}
            error={errors.state}
          />
          <FormField
            label={t('pages.settings.farm.city')}
            name="city"
            type="text"
            placeholder={t('pages.settings.farm.cityPlaceholder', {
              default: 'e.g. Seville',
            })}
            value={formData.city}
            onChange={handleFieldChange('city')}
            error={errors.city}
          />
          <FormField
            label={t('pages.settings.farm.postalCode')}
            name="postalCode"
            type="text"
            placeholder={t('pages.settings.farm.postalCodePlaceholder', {
              default: 'e.g. 41001',
            })}
            value={formData.postalCode}
            onChange={handleFieldChange('postalCode')}
            error={errors.postalCode}
          />
          <FormField
            label={t('pages.settings.farm.street')}
            name="street"
            type="text"
            placeholder={t('pages.settings.farm.streetPlaceholder', {
              default: 'e.g. 123 Olive Road',
            })}
            value={formData.street}
            onChange={handleFieldChange('street')}
            error={errors.street}
          />
          <FormField
            label={t('pages.settings.farm.latitude')}
            name="latitude"
            type="number"
            placeholder={t('pages.settings.farm.latitudePlaceholder', {
              default: 'e.g. 37.7749',
            })}
            value={formData.latitude}
            onChange={handleFieldChange('latitude')}
            error={errors.latitude}
          />
          <FormField
            label={t('pages.settings.farm.longitude')}
            name="longitude"
            type="number"
            placeholder={t('pages.settings.farm.longitudePlaceholder', {
              default: 'e.g. -122.4194',
            })}
            value={formData.longitude}
            onChange={handleFieldChange('longitude')}
            error={errors.longitude}
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
                <>🔄 {t('common.creating', { default: 'Creating' })}...</>
              ) : (
                <>
                  🌾{' '}
                  {t('pages.settings.farm.create.action', {
                    default: 'Create Farm',
                  })}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFarmDialog;
