import { Farm } from '@/contexts/farms/domain/entities/farm.entity';
import { SettingsSection } from '@/contexts/shared/presentation/components/molecules';
import { FormField } from '@/contexts/shared/presentation/components/molecules/form-field/form-field';
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';
import React from 'react';
import LocationMap from '@/contexts/shared/presentation/components/molecules/location-map/location-map';
import { SelectField } from '@/contexts/shared/presentation/components/molecules/select-field/select-field';
import { useGeographicSelector } from '@/contexts/shared/presentation/hooks/use-geographic-selector';

export interface FarmInfoSectionProps {
  formData: Farm | null;
  handleInputChange: (field: string, value: string) => void;
  errors: Record<string, string>;
  isEditing: boolean;
}

const FarmInfoSection = ({
  formData,
  handleInputChange,
  errors,
  isEditing,
}: FarmInfoSectionProps) => {
  const t = useTranslations();
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

  // Map formData values to selectedCountry/state/city
  React.useEffect(() => {
    if (formData?.country && !selectedCountry && countries.length > 0) {
      const found = countries.find(
        (c) => c.name.toLowerCase() === formData.country?.toLowerCase(),
      );
      if (found) setSelectedCountry(found);
    }
    if (formData?.state && !selectedState && states.length > 0) {
      const found = states.find(
        (s) => s.name.toLowerCase() === formData.state?.toLowerCase(),
      );
      if (found) setSelectedState(found);
    }
    if (formData?.city && !selectedCity && cities.length > 0) {
      const found = cities.find(
        (c) => c.name.toLowerCase() === formData.city?.toLowerCase(),
      );
      if (found) setSelectedCity(found);
    }
    // eslint-disable-next-line
  }, [formData, countries, states, cities]);

  return (
    <SettingsSection
      title={t('pages.settings.farm.general', {
        default: 'General Information',
      })}
      subtitle={t('pages.settings.farm.generalSubtitle', {
        default: 'Edit your farm details',
      })}
      icon="🌾"
    >
      <div className="mb-4">
        <FormField
          label={`${t('pages.settings.farm.name')}`}
          name="name"
          value={formData?.name || undefined}
          onChange={(v) => handleInputChange('name', v)}
          error={errors.name}
          disabled={!isEditing}
          placeholder={t('pages.settings.farm.namePlaceholder', {
            default: 'e.g. Green Valley Farm',
          })}
          helperText={t('pages.settings.farm.nameHelper', {
            default: 'Enter a unique name for your farm.',
          })}
        />
      </div>
      <div className="mb-4">
        <FormField
          label={`${t('pages.settings.farm.description')}`}
          name="description"
          value={formData?.description || undefined}
          onChange={(v) => handleInputChange('description', v)}
          error={errors.description}
          type="textarea"
          disabled={!isEditing}
          placeholder={t('pages.settings.farm.descriptionPlaceholder', {
            default:
              'Describe your farm, its location, or any special features.',
          })}
          helperText={t('pages.settings.farm.descriptionHelper', {
            default: 'Optional: Add a description to help identify your farm.',
          })}
        />
      </div>
      <Separator className="my-4" />
      {/* Location */}
      <h3 className="text-lg font-semibold mb-2">
        {t('pages.settings.farm.location', { default: 'Location' })}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <SelectField
          label={t('pages.settings.farm.country')}
          value={selectedCountry?.id?.toString() || undefined}
          onChange={(id) => {
            const country = countries.find((c) => c.id.toString() === id);
            setSelectedCountry(country || null);
            handleInputChange('country', country?.name || '');
          }}
          error={errors.country}
          disabled={!isEditing || loadingCountries}
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
            handleInputChange('state', state?.name || '');
          }}
          error={errors.state}
          disabled={!isEditing || !selectedCountry || loadingStates}
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
            handleInputChange('city', city?.name || '');
          }}
          error={errors.city}
          disabled={!isEditing || !selectedState || loadingCities}
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
          value={formData?.street || undefined}
          onChange={(v) => handleInputChange('street', v)}
          error={errors.street}
          disabled={!isEditing}
          placeholder={t('pages.settings.farm.streetPlaceholder', {
            default: 'e.g. 123 Olive Road',
          })}
          helperText={t('pages.settings.farm.streetHelper', {
            default: 'Street address or local description.',
          })}
        />
        <FormField
          label={t('pages.settings.farm.postalCode')}
          name="postalCode"
          value={formData?.postalCode || undefined}
          onChange={(v) => handleInputChange('postalCode', v)}
          error={errors.postalCode}
          disabled={!isEditing}
          placeholder={t('pages.settings.farm.postalCodePlaceholder', {
            default: 'e.g. 41001',
          })}
          helperText={t('pages.settings.farm.postalCodeHelper', {
            default: 'Postal or ZIP code.',
          })}
        />
      </div>
      <Separator className="my-4" />
      {/* Coordinates */}
      <h3 className="text-lg font-semibold mb-2">
        {t('pages.settings.farm.coordinates', { default: 'Coordinates' })}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={t('pages.settings.farm.latitude')}
          name="latitude"
          value={formData?.latitude?.toString() || undefined}
          onChange={(v) => handleInputChange('latitude', v)}
          error={errors.latitude}
          type="number"
          disabled={!isEditing}
          placeholder={t('pages.settings.farm.latitudePlaceholder', {
            default: 'e.g. 37.7749',
          })}
          helperText={t('pages.settings.farm.latitudeHelper', {
            default: 'Latitude in decimal degrees (e.g. 37.7749).',
          })}
        />
        <FormField
          label={t('pages.settings.farm.longitude')}
          name="longitude"
          value={formData?.longitude?.toString() || undefined}
          onChange={(v) => handleInputChange('longitude', v)}
          error={errors.longitude}
          type="number"
          disabled={!isEditing}
          placeholder={t('pages.settings.farm.longitudePlaceholder', {
            default: 'e.g. -122.4194',
          })}
          helperText={t('pages.settings.farm.longitudeHelper', {
            default: 'Longitude in decimal degrees (e.g. -122.4194).',
          })}
        />
      </div>

      {formData?.latitude && formData?.longitude && (
        <LocationMap
          lat={formData.latitude}
          lng={formData.longitude}
          className="my-4"
          title={t('pages.settings.farm.locationMap')}
        />
      )}
    </SettingsSection>
  );
};

export default FarmInfoSection;
