"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";

// UI Components
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import { Input } from "@/contexts/shared/presentation/components/ui/input";
import { Label } from "@/contexts/shared/presentation/components/ui/label";
import { Switch } from "@/contexts/shared/presentation/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/presentation/components/ui/select";

// Reusable components
import { SettingRow } from "@/contexts/shared/presentation/components/atoms";
import { SettingsSection } from "@/contexts/shared/presentation/components/molecules";

const SystemSettingsPage = () => {
  const t = useTranslations();

  // Location Settings State
  const [locationSettings, setLocationSettings] = useState({
    country: "Spain",
    city: "Madrid",
    timezone: "Europe/Madrid",
    latitude: "40.4168",
    longitude: "-3.7038",
  });

  // Language & Region Settings State
  const [languageSettings, setLanguageSettings] = useState({
    language: "es",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    temperatureUnit: "celsius",
    measurementUnit: "metric",
    currency: "EUR",
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    theme: "auto",
    darkMode: false,
    compactMode: false,
    animations: true,
    analytics: true,
    crashReporting: true,
    debugMode: false,
  });

  // Backup Settings State
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "weekly",
    lastBackup: "2024-01-15",
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);

    // Simulate geolocation detection
    setTimeout(() => {
      setLocationSettings((prev) => ({
        ...prev,
        latitude: "40.4168",
        longitude: "-3.7038",
        city: "Madrid",
        country: "Spain",
      }));
      setIsDetectingLocation(false);
    }, 2000);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);

    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      // Show success message (in real app, use toast or similar)
      alert(t("pages.settings.system.actions.saved"));
    }, 1500);
  };

  return (
    <PageTemplate pageTitle={t("pages.settings.system.title")}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t("pages.settings.system.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("pages.settings.system.subtitle")}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                // Reset all settings to defaults
                setLocationSettings({
                  country: "",
                  city: "",
                  timezone: "",
                  latitude: "",
                  longitude: "",
                });
              }}
            >
              {t("pages.settings.system.actions.reset")}
            </Button>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving
                ? t("pages.settings.system.actions.saving")
                : t("pages.settings.system.actions.save")}
            </Button>
          </div>
        </div>

        {/* Location Settings */}
        <SettingsSection
          title={t("pages.settings.system.location.title")}
          subtitle={t("pages.settings.system.location.subtitle")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SettingRow
              title={t("pages.settings.system.location.country")}
              orientation="vertical"
            >
              <Select
                value={locationSettings.country}
                onValueChange={(value) =>
                  setLocationSettings((prev) => ({ ...prev, country: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spain">🇪🇸 Spain</SelectItem>
                  <SelectItem value="France">🇫🇷 France</SelectItem>
                  <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                  <SelectItem value="Italy">🇮🇹 Italy</SelectItem>
                  <SelectItem value="Portugal">🇵🇹 Portugal</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.location.city")}
              orientation="vertical"
            >
              <Input
                value={locationSettings.city}
                onChange={(e) =>
                  setLocationSettings((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                placeholder="Enter your city"
              />
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.location.timezone")}
              orientation="vertical"
            >
              <Select
                value={locationSettings.timezone}
                onValueChange={(value) =>
                  setLocationSettings((prev) => ({ ...prev, timezone: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Madrid">
                    Europe/Madrid (GMT+1)
                  </SelectItem>
                  <SelectItem value="Europe/Paris">
                    Europe/Paris (GMT+1)
                  </SelectItem>
                  <SelectItem value="Europe/London">
                    Europe/London (GMT+0)
                  </SelectItem>
                  <SelectItem value="Europe/Berlin">
                    Europe/Berlin (GMT+1)
                  </SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.location.autoDetect")}
              orientation="vertical"
            >
              <Button
                variant="outline"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="w-full"
              >
                {isDetectingLocation
                  ? t("pages.settings.system.location.detecting")
                  : t("pages.settings.system.location.autoDetect")}
              </Button>
            </SettingRow>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SettingRow
              title={t("pages.settings.system.location.latitude")}
              orientation="vertical"
            >
              <Input
                value={locationSettings.latitude}
                onChange={(e) =>
                  setLocationSettings((prev) => ({
                    ...prev,
                    latitude: e.target.value,
                  }))
                }
                placeholder="40.4168"
              />
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.location.longitude")}
              orientation="vertical"
            >
              <Input
                value={locationSettings.longitude}
                onChange={(e) =>
                  setLocationSettings((prev) => ({
                    ...prev,
                    longitude: e.target.value,
                  }))
                }
                placeholder="-3.7038"
              />
            </SettingRow>
          </div>
        </SettingsSection>

        {/* Language & Region Settings */}
        <SettingsSection
          title={t("pages.settings.system.language.title")}
          subtitle={t("pages.settings.system.language.subtitle")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SettingRow
              title={t("pages.settings.system.language.language")}
              orientation="vertical"
            >
              <Select
                value={languageSettings.language}
                onValueChange={(value) =>
                  setLanguageSettings((prev) => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.language.temperatureUnit")}
              orientation="vertical"
            >
              <Select
                value={languageSettings.temperatureUnit}
                onValueChange={(value) =>
                  setLanguageSettings((prev) => ({
                    ...prev,
                    temperatureUnit: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.language.dateFormat")}
              orientation="vertical"
            >
              <Select
                value={languageSettings.dateFormat}
                onValueChange={(value) =>
                  setLanguageSettings((prev) => ({
                    ...prev,
                    dateFormat: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>

            <SettingRow
              title={t("pages.settings.system.language.timeFormat")}
              orientation="vertical"
            >
              <Select
                value={languageSettings.timeFormat}
                onValueChange={(value) =>
                  setLanguageSettings((prev) => ({
                    ...prev,
                    timeFormat: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="12h">12 Hours (AM/PM)</SelectItem>
                </SelectContent>
              </Select>
            </SettingRow>
          </div>
        </SettingsSection>

        {/* System Preferences */}
        <SettingsSection
          title={t("pages.settings.system.system.title")}
          subtitle={t("pages.settings.system.system.subtitle")}
        >
          <SettingRow
            title={t("pages.settings.system.system.theme")}
            description="Choose between light, dark, or system theme"
            orientation="vertical"
          >
            <Select
              value={systemSettings.theme}
              onValueChange={(value) =>
                setSystemSettings((prev) => ({ ...prev, theme: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.system.compactMode")}
            description="Use more compact spacing in the interface"
          >
            <Switch
              checked={systemSettings.compactMode}
              onCheckedChange={(checked) =>
                setSystemSettings((prev) => ({ ...prev, compactMode: checked }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.system.animations")}
            description="Enable smooth animations and transitions"
          >
            <Switch
              checked={systemSettings.animations}
              onCheckedChange={(checked) =>
                setSystemSettings((prev) => ({ ...prev, animations: checked }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.system.analytics")}
            description="Help improve the app by sharing usage data"
          >
            <Switch
              checked={systemSettings.analytics}
              onCheckedChange={(checked) =>
                setSystemSettings((prev) => ({ ...prev, analytics: checked }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.system.debugMode")}
            description="Enable debug mode for troubleshooting"
          >
            <Switch
              checked={systemSettings.debugMode}
              onCheckedChange={(checked) =>
                setSystemSettings((prev) => ({ ...prev, debugMode: checked }))
              }
            />
          </SettingRow>
        </SettingsSection>

        {/* Backup & Data */}
        <SettingsSection
          title={t("pages.settings.system.backup.title")}
          subtitle={t("pages.settings.system.backup.subtitle")}
        >
          <SettingRow
            title={t("pages.settings.system.backup.autoBackup")}
            description="Automatically backup your data"
          >
            <Switch
              checked={backupSettings.autoBackup}
              onCheckedChange={(checked) =>
                setBackupSettings((prev) => ({ ...prev, autoBackup: checked }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.backup.backupFrequency")}
            description="How often to create backups"
            orientation="vertical"
          >
            <Select
              value={backupSettings.backupFrequency}
              onValueChange={(value) =>
                setBackupSettings((prev) => ({
                  ...prev,
                  backupFrequency: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              {t("pages.settings.system.backup.exportData")}
            </Button>
            <Button variant="outline" className="flex-1">
              {t("pages.settings.system.backup.importData")}
            </Button>
          </div>
        </SettingsSection>
      </div>
    </PageTemplate>
  );
};

export default SystemSettingsPage;
