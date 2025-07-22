'use client';

import { usePlotOptions } from '@/contexts/plots/presentation/hooks/use-plot-options';
import { FormField } from '@/contexts/shared/presentation/components/molecules/form-field/form-field';
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
import { Separator } from '@/contexts/shared/presentation/components/ui/separator';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

interface CreatePlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePlot: (plotData: PlotFormData) => void;
  farmId: string; // Current farm ID
}

interface PlotFormData {
  name: string;
  width?: number;
  length?: number;
  height?: number;
  unitMeasurement?: string;
  soilType?: string;
  soilPh?: number;
  status?: string;
  farmId: string;
}

interface FormErrors {
  name?: string;
  width?: string;
  length?: string;
  height?: string;
  unitMeasurement?: string;
  soilType?: string;
  soilPh?: string;
  status?: string;
}

export const CreatePlotDialog: React.FC<CreatePlotDialogProps> = ({
  open,
  onOpenChange,
  onCreatePlot,
  farmId,
}) => {
  const t = useTranslations();
  const { soilTypeOptions, statusOptions, unitMeasurementOptions } =
    usePlotOptions();

  const [formData, setFormData] = useState<PlotFormData>({
    name: '',
    width: undefined,
    length: undefined,
    height: undefined,
    unitMeasurement: 'METERS',
    soilType: '',
    soilPh: undefined,
    status: 'ACTIVE',
    farmId,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('pages.garden.plots.form.errors.nameRequired');
    }

    if (formData.width !== undefined && formData.width < 0) {
      newErrors.width = t('pages.garden.plots.form.errors.widthInvalid');
    }

    if (formData.length !== undefined && formData.length < 0) {
      newErrors.length = t('pages.garden.plots.form.errors.lengthInvalid');
    }

    if (formData.height !== undefined && formData.height < 0) {
      newErrors.height = t('pages.garden.plots.form.errors.heightInvalid');
    }

    if (
      formData.soilPh !== undefined &&
      (formData.soilPh < 0 || formData.soilPh > 14)
    ) {
      newErrors.soilPh = t('pages.garden.plots.form.errors.soilPhInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Convert string values to numbers where needed
      const plotData = {
        ...formData,
        width: formData.width ? Number(formData.width) : undefined,
        length: formData.length ? Number(formData.length) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        soilPh: formData.soilPh ? Number(formData.soilPh) : undefined,
      };

      await onCreatePlot(plotData);

      // Reset form
      setFormData({
        name: '',
        width: undefined,
        length: undefined,
        height: undefined,
        unitMeasurement: 'METERS',
        soilType: '',
        soilPh: undefined,
        status: 'ACTIVE',
        farmId,
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating plot:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field: keyof PlotFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🌱 {t('pages.garden.plots.form.title')}
          </DialogTitle>
          <DialogDescription>
            {t('pages.garden.plots.form.description')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('pages.garden.plots.form.basicInfo')}
            </h3>

            <FormField
              label={t('pages.garden.plots.form.name')}
              name="name"
              type="text"
              placeholder={t('pages.garden.plots.form.namePlaceholder')}
              value={formData.name}
              onChange={handleFieldChange('name')}
              error={errors.name}
              required
              helperText={t('pages.garden.plots.form.nameHelper')}
            />
          </div>

          <Separator />

          {/* Dimensions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('pages.garden.plots.form.dimensions')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label={t('pages.garden.plots.form.width')}
                name="width"
                type="number"
                placeholder={t('pages.garden.plots.form.widthPlaceholder')}
                value={formData.width?.toString() || ''}
                onChange={handleFieldChange('width')}
                error={errors.width}
                helperText={t('pages.garden.plots.form.widthHelper')}
              />

              <FormField
                label={t('pages.garden.plots.form.length')}
                name="length"
                type="number"
                placeholder={t('pages.garden.plots.form.lengthPlaceholder')}
                value={formData.length?.toString() || ''}
                onChange={handleFieldChange('length')}
                error={errors.length}
                helperText={t('pages.garden.plots.form.lengthHelper')}
              />

              <FormField
                label={t('pages.garden.plots.form.height')}
                name="height"
                type="number"
                placeholder={t('pages.garden.plots.form.heightPlaceholder')}
                value={formData.height?.toString() || ''}
                onChange={handleFieldChange('height')}
                error={errors.height}
                helperText={t('pages.garden.plots.form.heightHelper')}
              />
            </div>

            <SelectField
              label={t('pages.garden.plots.form.unitMeasurement')}
              options={unitMeasurementOptions}
              value={formData.unitMeasurement}
              onChange={handleFieldChange('unitMeasurement')}
              placeholder={t(
                'pages.garden.plots.form.unitMeasurementPlaceholder',
              )}
              error={errors.unitMeasurement}
              helperText={t('pages.garden.plots.form.unitMeasurementHelper')}
            />
          </div>

          <Separator />

          {/* Soil Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('pages.garden.plots.form.soilInfo')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label={t('pages.garden.plots.form.soilType')}
                options={soilTypeOptions}
                value={formData.soilType}
                onChange={handleFieldChange('soilType')}
                placeholder={t('pages.garden.plots.form.soilTypePlaceholder')}
                error={errors.soilType}
                helperText={t('pages.garden.plots.form.soilTypeHelper')}
              />

              <FormField
                label={t('pages.garden.plots.form.soilPh')}
                name="soilPh"
                type="number"
                placeholder={t('pages.garden.plots.form.soilPhPlaceholder')}
                value={formData.soilPh?.toString() || ''}
                onChange={handleFieldChange('soilPh')}
                error={errors.soilPh}
                helperText={t('pages.garden.plots.form.soilPhHelper')}
              />
            </div>
          </div>

          <Separator />

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('pages.garden.plots.form.status')}
            </h3>

            <SelectField
              label={t('pages.garden.plots.form.status')}
              options={statusOptions}
              value={formData.status}
              onChange={handleFieldChange('status')}
              placeholder={t('pages.garden.plots.form.statusPlaceholder')}
              error={errors.status}
              helperText={t('pages.garden.plots.form.statusHelper')}
            />
          </div>

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
                <>🌱 {t('pages.garden.plots.form.create')}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlotDialog;
