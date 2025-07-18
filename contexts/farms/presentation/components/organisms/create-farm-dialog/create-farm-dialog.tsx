import { FormField } from '@/contexts/shared/presentation/components/molecules/form-field/form-field';
import LocationMap from '@/contexts/shared/presentation/components/molecules/location-map/location-map';
import { SelectField } from '@/contexts/shared/presentation/components/molecules/select-field/select-field';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/contexts/shared/presentation/components/ui/dialog';
import { useSidebar } from '@/contexts/shared/presentation/components/ui/sidebar';
import { useGeographicSelector } from '@/contexts/shared/presentation/hooks/use-geographic-selector';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

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
  const { setOpen } = useSidebar();
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    loadingCountries,
    loadingStates,
    loadingCities,
  } = useGeographicSelector();

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
            helperText={t('pages.settings.farm.nameHelper', {
              default: 'Enter a unique name for your farm.',
            })}
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
            helperText={t('pages.settings.farm.descriptionHelper', {
              default:
                'Optional: Add a description to help identify your farm.',
            })}
          />

          {/* Location Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('pages.settings.farm.location', { default: 'Location' })}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label={t('pages.settings.farm.country')}
                value={selectedCountry?.id?.toString() || undefined}
                onChange={(id) => {
                  const country = countries.find((c) => c.id.toString() === id);
                  setSelectedCountry(country || null);
                  handleFieldChange('country')(country?.name || '');
                }}
                error={errors.country}
                disabled={loadingCountries}
                placeholder={t('pages.settings.farm.countryPlaceholder', {
                  default: 'e.g. Spain',
                })}
                helperText={t('pages.settings.farm.countryHelper', {
                  default: 'Country where your farm is located.',
                })}
                options={countries.map((c) => ({
                  value: c.id.toString(),
                  label: c.name,
                }))}
              />

              <SelectField
                label={t('pages.settings.farm.state')}
                value={selectedState?.id?.toString() || undefined}
                onChange={(id) => {
                  const state = states.find((s) => s.id.toString() === id);
                  setSelectedState(state || null);
                  handleFieldChange('state')(state?.name || '');
                }}
                error={errors.state}
                disabled={!selectedCountry || loadingStates}
                placeholder={t('pages.settings.farm.statePlaceholder', {
                  default: 'e.g. Andalusia',
                })}
                helperText={t('pages.settings.farm.stateHelper', {
                  default: 'State, province or region.',
                })}
                options={states.map((s) => ({
                  value: s.id.toString(),
                  label: s.name,
                }))}
              />

              <SelectField
                label={t('pages.settings.farm.city')}
                value={selectedCity?.id?.toString() || undefined}
                onChange={(id) => {
                  const city = cities.find((c) => c.id.toString() === id);
                  setSelectedCity(city || null);
                  handleFieldChange('city')(city?.name || '');
                }}
                error={errors.city}
                disabled={!selectedState || loadingCities}
                placeholder={t('pages.settings.farm.cityPlaceholder', {
                  default: 'City or town of your farm.',
                })}
                options={cities.map((c) => ({
                  value: c.id.toString(),
                  label: c.name,
                }))}
                helperText={t('pages.settings.farm.cityHelper')}
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
                helperText={t('pages.settings.farm.streetHelper', {
                  default: 'Street address or local description.',
                })}
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
                helperText={t('pages.settings.farm.postalCodeHelper', {
                  default: 'Postal or ZIP code.',
                })}
              />
            </div>
          </div>

          {/* Coordinates Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('pages.settings.farm.coordinates', { default: 'Coordinates' })}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                helperText={t('pages.settings.farm.latitudeHelper', {
                  default: 'Latitude in decimal degrees (e.g. 37.7749).',
                })}
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
                helperText={t('pages.settings.farm.longitudeHelper', {
                  default: 'Longitude in decimal degrees (e.g. -122.4194).',
                })}
              />
            </div>
          </div>

          {formData.latitude && formData.longitude && (
            <LocationMap
              lat={formData.latitude}
              lng={formData.longitude}
              className="my-4"
              title={t('pages.settings.farm.locationMap')}
            />
          )}
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
