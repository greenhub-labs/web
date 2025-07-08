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
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";
import { Checkbox } from "@/contexts/shared/presentation/components/ui/checkbox";
import { Schedule } from "@/contexts/shared/presentation/components/molecules/ScheduleCard";
import type {
  ScheduleType,
  Frequency,
  Priority,
} from "@/contexts/shared/presentation/components/atoms";

interface CreateScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule?: Schedule | null;
  onSubmit: (scheduleData: Partial<Schedule>) => void;
  isLoading?: boolean;
  // Translation props
  t: {
    form: {
      title: string;
      editTitle: string;
      description: string;
      name: string;
      namePlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      scheduleType: string;
      scheduleTypePlaceholder: string;
      frequency: string;
      frequencyPlaceholder: string;
      targetSystems: string;
      targetSystemsPlaceholder: string;
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
        typeRequired: string;
        frequencyRequired: string;
        timeRequired: string;
        systemsRequired: string;
        invalidTimeRange: string;
      };
    };
    scheduleTypes: {
      irrigation: string;
      lighting: string;
      climate: string;
      feeding: string;
      doors: string;
      custom: string;
    };
    frequency: {
      once: string;
      daily: string;
      weekly: string;
      monthly: string;
      custom: string;
    };
    priority: {
      high: string;
      medium: string;
      low: string;
    };
    days: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
      weekdays: string;
      weekends: string;
      everyday: string;
    };
    timeSettings: {
      title: string;
      startTime: string;
      endTime: string;
      duration: string;
      timezone: string;
      repeatInterval: string;
      occurrences: string;
      infinite: string;
    };
    conditions: {
      title: string;
      weatherDependent: string;
      sensorBased: string;
      temperatureRange: string;
      humidityRange: string;
      lightLevel: string;
      rainDetection: string;
      skipIfRaining: string;
      skipIfTooHot: string;
      skipIfTooCold: string;
    };
    actions: {
      title: string;
      startIrrigation: string;
      stopIrrigation: string;
      turnOnLights: string;
      turnOffLights: string;
      openDoor: string;
      closeDoor: string;
      sendNotification: string;
      customCommand: string;
    };
  };
  tCommon: {
    cancel: string;
  };
}

export const CreateScheduleDialog: React.FC<CreateScheduleDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onSubmit,
  isLoading = false,
  t,
  tCommon,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "" as ScheduleType | "",
    frequency: "" as Frequency | "",
    priority: "medium" as Priority,
    startTime: "",
    endTime: "",
    targetSystems: [] as string[],
    isEnabled: true,
    selectedDays: [] as string[],
    skipIfRaining: false,
    skipIfTooHot: false,
    skipIfTooCold: false,
    weatherDependent: false,
    sensorBased: false,
    temperatureMin: "",
    temperatureMax: "",
    humidityMin: "",
    humidityMax: "",
    lightLevel: "",
    customCommand: "",
    duration: "",
    repeatInterval: "1",
    occurrences: "",
    infiniteRun: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns
  const availableSystems = [
    { id: "irrigation_zone_1", name: "Irrigation Zone 1" },
    { id: "irrigation_zone_2", name: "Irrigation Zone 2" },
    { id: "lighting_greenhouse", name: "Greenhouse Lighting" },
    { id: "lighting_outdoor", name: "Outdoor Lighting" },
    { id: "climate_greenhouse", name: "Greenhouse Climate" },
    { id: "doors_main", name: "Main Door" },
    { id: "doors_coop", name: "Coop Door" },
    { id: "feeding_chickens", name: "Chicken Feeder" },
  ];

  const weekDays = [
    { value: "monday", label: t.days.monday },
    { value: "tuesday", label: t.days.tuesday },
    { value: "wednesday", label: t.days.wednesday },
    { value: "thursday", label: t.days.thursday },
    { value: "friday", label: t.days.friday },
    { value: "saturday", label: t.days.saturday },
    { value: "sunday", label: t.days.sunday },
  ];

  // Initialize form when schedule prop changes
  useEffect(() => {
    if (schedule) {
      setFormData({
        name: schedule.name || "",
        description: schedule.description || "",
        type: schedule.type || "",
        frequency: schedule.frequency || "",
        priority: schedule.priority || "medium",
        startTime: schedule.startTime || "",
        endTime: schedule.endTime || "",
        targetSystems: schedule.targetSystems || [],
        isEnabled: schedule.isEnabled ?? true,
        selectedDays: [],
        skipIfRaining: false,
        skipIfTooHot: false,
        skipIfTooCold: false,
        weatherDependent: false,
        sensorBased: false,
        temperatureMin: "",
        temperatureMax: "",
        humidityMin: "",
        humidityMax: "",
        lightLevel: "",
        customCommand: "",
        duration: "",
        repeatInterval: "1",
        occurrences: "",
        infiniteRun: true,
      });
    } else {
      // Reset form for new schedule
      setFormData({
        name: "",
        description: "",
        type: "",
        frequency: "",
        priority: "medium",
        startTime: "",
        endTime: "",
        targetSystems: [],
        isEnabled: true,
        selectedDays: [],
        skipIfRaining: false,
        skipIfTooHot: false,
        skipIfTooCold: false,
        weatherDependent: false,
        sensorBased: false,
        temperatureMin: "",
        temperatureMax: "",
        humidityMin: "",
        humidityMax: "",
        lightLevel: "",
        customCommand: "",
        duration: "",
        repeatInterval: "1",
        occurrences: "",
        infiniteRun: true,
      });
    }
    setErrors({});
  }, [schedule, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.form.errors.nameRequired;
    }
    if (!formData.type) {
      newErrors.type = t.form.errors.typeRequired;
    }
    if (!formData.frequency) {
      newErrors.frequency = t.form.errors.frequencyRequired;
    }
    if (!formData.startTime) {
      newErrors.startTime = t.form.errors.timeRequired;
    }
    if (formData.targetSystems.length === 0) {
      newErrors.targetSystems = t.form.errors.systemsRequired;
    }
    if (
      formData.endTime &&
      formData.startTime &&
      formData.endTime <= formData.startTime
    ) {
      newErrors.endTime = t.form.errors.invalidTimeRange;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const scheduleData: Partial<Schedule> = {
      name: formData.name,
      description: formData.description,
      type: formData.type as ScheduleType,
      frequency: formData.frequency as Frequency,
      priority: formData.priority,
      startTime: formData.startTime,
      endTime: formData.endTime || undefined,
      targetSystems: formData.targetSystems,
      isEnabled: formData.isEnabled,
    };

    onSubmit(scheduleData);
  };

  const handleSystemToggle = (systemId: string) => {
    setFormData((prev) => ({
      ...prev,
      targetSystems: prev.targetSystems.includes(systemId)
        ? prev.targetSystems.filter((id) => id !== systemId)
        : [...prev.targetSystems, systemId],
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {schedule ? t.form.editTitle : t.form.title}
          </DialogTitle>
          <DialogDescription>{t.form.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t.form.scheduleType}</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: value as ScheduleType,
                    }))
                  }
                >
                  <SelectTrigger
                    className={errors.type ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder={t.form.scheduleTypePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="irrigation">
                      {t.scheduleTypes.irrigation}
                    </SelectItem>
                    <SelectItem value="lighting">
                      {t.scheduleTypes.lighting}
                    </SelectItem>
                    <SelectItem value="climate">
                      {t.scheduleTypes.climate}
                    </SelectItem>
                    <SelectItem value="feeding">
                      {t.scheduleTypes.feeding}
                    </SelectItem>
                    <SelectItem value="doors">
                      {t.scheduleTypes.doors}
                    </SelectItem>
                    <SelectItem value="custom">
                      {t.scheduleTypes.custom}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t.form.frequency}</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      frequency: value as Frequency,
                    }))
                  }
                >
                  <SelectTrigger
                    className={errors.frequency ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder={t.form.frequencyPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">{t.frequency.once}</SelectItem>
                    <SelectItem value="daily">{t.frequency.daily}</SelectItem>
                    <SelectItem value="weekly">{t.frequency.weekly}</SelectItem>
                    <SelectItem value="monthly">
                      {t.frequency.monthly}
                    </SelectItem>
                    <SelectItem value="custom">{t.frequency.custom}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.frequency && (
                  <p className="text-sm text-red-500">{errors.frequency}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t.form.priority}</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: value as Priority,
                    }))
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
          </div>

          <Separator />

          {/* Time Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t.timeSettings.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">{t.timeSettings.startTime}</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  className={errors.startTime ? "border-red-500" : ""}
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">{errors.startTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">{t.timeSettings.endTime}</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  className={errors.endTime ? "border-red-500" : ""}
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Days Selection for Weekly */}
            {formData.frequency === "weekly" && (
              <div className="space-y-2">
                <Label>Active Days</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {weekDays.map((day) => (
                    <div
                      key={day.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={day.value}
                        checked={formData.selectedDays.includes(day.value)}
                        onCheckedChange={() => handleDayToggle(day.value)}
                      />
                      <Label htmlFor={day.value} className="text-sm">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Target Systems */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t.form.targetSystems}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-3">
                {availableSystems.map((system) => (
                  <div key={system.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={system.id}
                      checked={formData.targetSystems.includes(system.id)}
                      onCheckedChange={() => handleSystemToggle(system.id)}
                    />
                    <Label htmlFor={system.id} className="text-sm">
                      {system.name}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.targetSystems && (
                <p className="text-sm text-red-500">{errors.targetSystems}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t.conditions.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="weatherDependent">
                    {t.conditions.weatherDependent}
                  </Label>
                  <Switch
                    id="weatherDependent"
                    checked={formData.weatherDependent}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        weatherDependent: checked,
                      }))
                    }
                  />
                </div>

                {formData.weatherDependent && (
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="skipIfRaining">
                        {t.conditions.skipIfRaining}
                      </Label>
                      <Switch
                        id="skipIfRaining"
                        checked={formData.skipIfRaining}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            skipIfRaining: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="skipIfTooHot">
                        {t.conditions.skipIfTooHot}
                      </Label>
                      <Switch
                        id="skipIfTooHot"
                        checked={formData.skipIfTooHot}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            skipIfTooHot: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="skipIfTooCold">
                        {t.conditions.skipIfTooCold}
                      </Label>
                      <Switch
                        id="skipIfTooCold"
                        checked={formData.skipIfTooCold}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            skipIfTooCold: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sensorBased">
                    {t.conditions.sensorBased}
                  </Label>
                  <Switch
                    id="sensorBased"
                    checked={formData.sensorBased}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, sensorBased: checked }))
                    }
                  />
                </div>

                {formData.sensorBased && (
                  <div className="space-y-2 pl-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label htmlFor="tempMin" className="text-xs">
                          {t.conditions.temperatureRange} Min
                        </Label>
                        <Input
                          id="tempMin"
                          type="number"
                          placeholder="15"
                          value={formData.temperatureMin}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              temperatureMin: e.target.value,
                            }))
                          }
                          className="h-8"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="tempMax" className="text-xs">
                          Max
                        </Label>
                        <Input
                          id="tempMax"
                          type="number"
                          placeholder="30"
                          value={formData.temperatureMax}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              temperatureMax: e.target.value,
                            }))
                          }
                          className="h-8"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Enable/Disable */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="enabled">{t.form.enabled}</Label>
              <p className="text-sm text-muted-foreground">
                {t.form.enabledDescription}
              </p>
            </div>
            <Switch
              id="enabled"
              checked={formData.isEnabled}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isEnabled: checked }))
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 pt-6">
          <Button
            variant="outline"
            className="order-2 sm:order-1"
            onClick={() => onOpenChange(false)}
          >
            {tCommon.cancel}
          </Button>
          <Button
            className="order-1 sm:order-2"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading
              ? schedule
                ? t.form.updating
                : t.form.creating
              : schedule
              ? t.form.update
              : t.form.create}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
