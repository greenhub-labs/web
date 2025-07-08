import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/contexts/shared/presentation/components/ui/dialog";
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import { Input } from "@/contexts/shared/presentation/components/ui/input";
import { Textarea } from "@/contexts/shared/presentation/components/ui/textarea";
import { Switch } from "@/contexts/shared/presentation/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/presentation/components/ui/select";
import { Label } from "@/contexts/shared/presentation/components/ui/label";
import { RuleTypeIcon } from "@/contexts/shared/presentation/components/atoms";
import type {
  RuleType,
  Priority,
} from "@/contexts/shared/presentation/components/atoms";
import type { IrrigationRule } from "@/contexts/shared/presentation/components/molecules";

interface CreateIrrigationRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rule: Partial<IrrigationRule>) => Promise<void>;
  editingRule?: IrrigationRule | null;
  availablePlots: Array<{ id: string; name: string; location: string }>;
  translations: {
    form: {
      title: string;
      editTitle: string;
      description: string;
      name: string;
      namePlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      ruleType: string;
      ruleTypePlaceholder: string;
      targetPlots: string;
      targetPlotsPlaceholder: string;
      priority: string;
      priorityPlaceholder: string;
      enabled: string;
      enabledDescription: string;
      create: string;
      update: string;
      creating: string;
      updating: string;
      errors: {
        nameRequired: string;
        ruleTypeRequired: string;
        plotsRequired: string;
      };
    };
    ruleTypes: {
      moisture: string;
      schedule: string;
      weather: string;
      temperature: string;
      manual: string;
    };
    priority: {
      high: string;
      medium: string;
      low: string;
    };
    common: {
      cancel: string;
    };
  };
}

interface FormData {
  name: string;
  description: string;
  type: RuleType | "";
  targetPlots: string[];
  priority: Priority | "";
  enabled: boolean;
}

interface FormErrors {
  name?: string;
  type?: string;
  targetPlots?: string;
}

export const CreateIrrigationRuleDialog: React.FC<
  CreateIrrigationRuleDialogProps
> = ({
  open,
  onOpenChange,
  onSubmit,
  editingRule,
  availablePlots,
  translations: t,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    type: "",
    targetPlots: [],
    priority: "",
    enabled: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes or when editing rule changes
  useEffect(() => {
    if (open) {
      if (editingRule) {
        setFormData({
          name: editingRule.name,
          description: editingRule.description,
          type: editingRule.type,
          targetPlots: editingRule.targetPlots,
          priority: editingRule.priority,
          enabled: editingRule.status === "active",
        });
      } else {
        setFormData({
          name: "",
          description: "",
          type: "",
          targetPlots: [],
          priority: "",
          enabled: true,
        });
      }
      setErrors({});
    }
  }, [open, editingRule]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.form.errors.nameRequired;
    }

    if (!formData.type) {
      newErrors.type = t.form.errors.ruleTypeRequired;
    }

    if (formData.targetPlots.length === 0) {
      newErrors.targetPlots = t.form.errors.plotsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const ruleData: Partial<IrrigationRule> = {
        ...formData,
        type: formData.type as RuleType,
        priority: formData.priority as Priority,
        status: formData.enabled ? "active" : "inactive",
      };

      if (editingRule) {
        ruleData.id = editingRule.id;
      }

      await onSubmit(ruleData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting rule:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlotToggle = (plotId: string) => {
    setFormData((prev) => ({
      ...prev,
      targetPlots: prev.targetPlots.includes(plotId)
        ? prev.targetPlots.filter((id) => id !== plotId)
        : [...prev.targetPlots, plotId],
    }));
  };

  const isEditing = Boolean(editingRule);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t.form.editTitle : t.form.title}
          </DialogTitle>
          <DialogDescription>{t.form.description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.form.name}</Label>
              <Input
                id="name"
                placeholder={t.form.namePlaceholder}
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.form.description}</Label>
              <Textarea
                id="description"
                placeholder={t.form.descriptionPlaceholder}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
          </div>

          {/* Rule Type and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">{t.form.ruleType}</Label>
              <Select
                value={formData.type}
                onValueChange={(value: RuleType) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder={t.form.ruleTypePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moisture">
                    <div className="flex items-center space-x-2">
                      <RuleTypeIcon type="moisture" size={16} />
                      <span>{t.ruleTypes.moisture}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="schedule">
                    <div className="flex items-center space-x-2">
                      <RuleTypeIcon type="schedule" size={16} />
                      <span>{t.ruleTypes.schedule}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="weather">
                    <div className="flex items-center space-x-2">
                      <RuleTypeIcon type="weather" size={16} />
                      <span>{t.ruleTypes.weather}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="temperature">
                    <div className="flex items-center space-x-2">
                      <RuleTypeIcon type="temperature" size={16} />
                      <span>{t.ruleTypes.temperature}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="manual">
                    <div className="flex items-center space-x-2">
                      <RuleTypeIcon type="manual" size={16} />
                      <span>{t.ruleTypes.manual}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">{t.form.priority}</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Priority) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.form.priorityPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t.priority.high}</SelectItem>
                  <SelectItem value="medium">{t.priority.medium}</SelectItem>
                  <SelectItem value="low">{t.priority.low}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Target Plots */}
          <div className="space-y-2">
            <Label>{t.form.targetPlots}</Label>
            <div className="border rounded-md p-3 space-y-2 max-h-32 overflow-y-auto">
              {availablePlots.map((plot) => (
                <div key={plot.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`plot-${plot.id}`}
                    checked={formData.targetPlots.includes(plot.id)}
                    onChange={() => handlePlotToggle(plot.id)}
                    className="rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`plot-${plot.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-sm">{plot.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {plot.location}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
            {errors.targetPlots && (
              <p className="text-sm text-red-500">{errors.targetPlots}</p>
            )}
          </div>

          {/* Enable Rule */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enabled">{t.form.enabled}</Label>
              <p className="text-sm text-muted-foreground">
                {t.form.enabledDescription}
              </p>
            </div>
            <Switch
              id="enabled"
              checked={formData.enabled}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, enabled: checked }))
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {t.common.cancel}
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? t.form.updating
                  : t.form.creating
                : isEditing
                ? t.form.update
                : t.form.create}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
