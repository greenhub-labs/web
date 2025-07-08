"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/contexts/shared/presentation/components/ui/dialog";
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import { FormField } from "@/contexts/shared/presentation/components/molecules/FormField";

interface CreatePlotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePlot: (plotData: PlotFormData) => void;
}

interface PlotFormData {
  name: string;
  location: string;
  size: string;
  soilType: string;
  description: string;
}

interface FormErrors {
  name?: string;
  location?: string;
  size?: string;
  soilType?: string;
}

export const CreatePlotDialog: React.FC<CreatePlotDialogProps> = ({
  open,
  onOpenChange,
  onCreatePlot,
}) => {
  const t = useTranslations();

  const [formData, setFormData] = useState<PlotFormData>({
    name: "",
    location: "",
    size: "",
    soilType: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const soilTypeOptions = [
    { value: "clay", label: t("pages.garden.plots.form.soilTypes.clay") },
    { value: "sandy", label: t("pages.garden.plots.form.soilTypes.sandy") },
    { value: "loamy", label: t("pages.garden.plots.form.soilTypes.loamy") },
    { value: "rocky", label: t("pages.garden.plots.form.soilTypes.rocky") },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("pages.garden.plots.form.errors.nameRequired");
    }
    if (!formData.location.trim()) {
      newErrors.location = t("pages.garden.plots.form.errors.locationRequired");
    }
    if (!formData.size.trim()) {
      newErrors.size = t("pages.garden.plots.form.errors.sizeRequired");
    }
    if (!formData.soilType) {
      newErrors.soilType = t("pages.garden.plots.form.errors.soilTypeRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await onCreatePlot(formData);

      // Reset form
      setFormData({
        name: "",
        location: "",
        size: "",
        soilType: "",
        description: "",
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating plot:", error);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🌱 {t("pages.garden.plots.form.title")}
          </DialogTitle>
          <DialogDescription>
            {t("pages.garden.plots.form.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label={t("pages.garden.plots.form.name")}
            name="name"
            type="text"
            placeholder={t("pages.garden.plots.form.namePlaceholder")}
            value={formData.name}
            onChange={handleFieldChange("name")}
            error={errors.name}
            required
          />

          <FormField
            label={t("pages.garden.plots.form.location")}
            name="location"
            type="text"
            placeholder={t("pages.garden.plots.form.locationPlaceholder")}
            value={formData.location}
            onChange={handleFieldChange("location")}
            error={errors.location}
            required
          />

          <FormField
            label={t("pages.garden.plots.form.size")}
            name="size"
            type="text"
            placeholder={t("pages.garden.plots.form.sizePlaceholder")}
            value={formData.size}
            onChange={handleFieldChange("size")}
            error={errors.size}
            required
          />

          <FormField
            label={t("pages.garden.plots.form.soilType")}
            name="soilType"
            type="select"
            placeholder={t("pages.garden.plots.form.soilTypePlaceholder")}
            value={formData.soilType}
            onChange={handleFieldChange("soilType")}
            options={soilTypeOptions}
            error={errors.soilType}
            required
          />

          <FormField
            label={t("pages.garden.plots.form.description")}
            name="description"
            type="textarea"
            placeholder={t("pages.garden.plots.form.descriptionPlaceholder")}
            value={formData.description}
            onChange={handleFieldChange("description")}
            rows={3}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>🔄 {t("common.creating")}...</>
              ) : (
                <>🌱 {t("pages.garden.plots.form.create")}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
