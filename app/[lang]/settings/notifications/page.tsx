"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";

// UI Components
import { Button } from "@/contexts/shared/presentation/components/ui/button";
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

const NotificationSettingsPage = () => {
  const t = useTranslations();

  // Notification Method Settings State
  const [notificationMethods, setNotificationMethods] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  });

  // Alert Types Settings State
  const [alertTypes, setAlertTypes] = useState({
    criticalAlerts: true,
    maintenanceAlerts: true,
    weatherAlerts: true,
    harvestReminders: false,
  });

  // Notification Schedule Settings State
  const [scheduleSettings, setScheduleSettings] = useState({
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    weekendNotifications: true,
    urgentOverride: true,
  });

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    dailySummary: true,
    weeklySummary: true,
    instantAlerts: true,
    frequency: "immediate", // immediate, hourly, daily
  });

  // Saving state
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);

    // Simulate API call
    console.log("Saving notification settings...", {
      notificationMethods,
      alertTypes,
      scheduleSettings,
      emailSettings,
    });

    // Simulate loading time
    setTimeout(() => {
      setIsSaving(false);
      alert(t("pages.settings.system.actions.saved"));
    }, 1500);
  };

  return (
    <PageTemplate pageTitle={t("navigation.settings.notifications")}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {t("pages.settings.system.notifications.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("pages.settings.system.notifications.subtitle")}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                // Reset all notification settings to defaults
                setNotificationMethods({
                  emailNotifications: true,
                  pushNotifications: true,
                  smsNotifications: false,
                });
                setAlertTypes({
                  criticalAlerts: true,
                  maintenanceAlerts: true,
                  weatherAlerts: true,
                  harvestReminders: false,
                });
                setScheduleSettings({
                  quietHoursEnabled: true,
                  quietHoursStart: "22:00",
                  quietHoursEnd: "07:00",
                  weekendNotifications: true,
                  urgentOverride: true,
                });
                setEmailSettings({
                  dailySummary: true,
                  weeklySummary: true,
                  instantAlerts: true,
                  frequency: "immediate",
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

        {/* Notification Methods */}
        <SettingsSection
          title={t("pages.settings.system.notifications.title")}
          subtitle={t("pages.settings.system.notifications.subtitle")}
        >
          <SettingRow
            title={t("pages.settings.system.notifications.emailNotifications")}
            description={t(
              "pages.settings.system.notifications.emailNotificationsDesc"
            )}
          >
            <Switch
              checked={notificationMethods.emailNotifications}
              onCheckedChange={(checked) =>
                setNotificationMethods((prev) => ({
                  ...prev,
                  emailNotifications: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.pushNotifications")}
            description={t(
              "pages.settings.system.notifications.pushNotificationsDesc"
            )}
          >
            <Switch
              checked={notificationMethods.pushNotifications}
              onCheckedChange={(checked) =>
                setNotificationMethods((prev) => ({
                  ...prev,
                  pushNotifications: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.smsNotifications")}
            description={t(
              "pages.settings.system.notifications.smsNotificationsDesc"
            )}
          >
            <Switch
              checked={notificationMethods.smsNotifications}
              onCheckedChange={(checked) =>
                setNotificationMethods((prev) => ({
                  ...prev,
                  smsNotifications: checked,
                }))
              }
            />
          </SettingRow>
        </SettingsSection>

        {/* Alert Types */}
        <SettingsSection
          title={t("pages.settings.system.notifications.alertTypes")}
          subtitle={t("pages.settings.system.notifications.alertTypesDesc")}
        >
          <SettingRow
            title={t("pages.settings.system.notifications.criticalAlerts")}
            description={t(
              "pages.settings.system.notifications.criticalAlertsDesc"
            )}
          >
            <Switch
              checked={alertTypes.criticalAlerts}
              onCheckedChange={(checked) =>
                setAlertTypes((prev) => ({
                  ...prev,
                  criticalAlerts: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.maintenanceAlerts")}
            description={t(
              "pages.settings.system.notifications.maintenanceAlertsDesc"
            )}
          >
            <Switch
              checked={alertTypes.maintenanceAlerts}
              onCheckedChange={(checked) =>
                setAlertTypes((prev) => ({
                  ...prev,
                  maintenanceAlerts: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.weatherAlerts")}
            description={t(
              "pages.settings.system.notifications.weatherAlertsDesc"
            )}
          >
            <Switch
              checked={alertTypes.weatherAlerts}
              onCheckedChange={(checked) =>
                setAlertTypes((prev) => ({
                  ...prev,
                  weatherAlerts: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.harvestReminders")}
            description={t(
              "pages.settings.system.notifications.harvestRemindersDesc"
            )}
          >
            <Switch
              checked={alertTypes.harvestReminders}
              onCheckedChange={(checked) =>
                setAlertTypes((prev) => ({
                  ...prev,
                  harvestReminders: checked,
                }))
              }
            />
          </SettingRow>
        </SettingsSection>

        {/* Email Notification Settings */}
        <SettingsSection
          title={t("pages.settings.system.notifications.email.title")}
          subtitle={t("pages.settings.system.notifications.email.subtitle")}
        >
          <SettingRow
            title={t("pages.settings.system.notifications.email.dailySummary")}
            description={t(
              "pages.settings.system.notifications.email.dailySummaryDesc"
            )}
          >
            <Switch
              checked={emailSettings.dailySummary}
              onCheckedChange={(checked) =>
                setEmailSettings((prev) => ({
                  ...prev,
                  dailySummary: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.email.weeklySummary")}
            description={t(
              "pages.settings.system.notifications.email.weeklySummaryDesc"
            )}
          >
            <Switch
              checked={emailSettings.weeklySummary}
              onCheckedChange={(checked) =>
                setEmailSettings((prev) => ({
                  ...prev,
                  weeklySummary: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t("pages.settings.system.notifications.email.frequency")}
            description={t(
              "pages.settings.system.notifications.email.frequencyDesc"
            )}
            orientation="vertical"
          >
            <Select
              value={emailSettings.frequency}
              onValueChange={(value) =>
                setEmailSettings((prev) => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">
                  {t("pages.settings.system.notifications.email.immediate")}
                </SelectItem>
                <SelectItem value="hourly">
                  {t("pages.settings.system.notifications.email.hourly")}
                </SelectItem>
                <SelectItem value="daily">
                  {t("pages.settings.system.notifications.email.daily")}
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </SettingsSection>

        {/* Notification Schedule */}
        <SettingsSection
          title={t("pages.settings.system.notifications.schedule.title")}
          subtitle={t("pages.settings.system.notifications.schedule.subtitle")}
        >
          <SettingRow
            title={t("pages.settings.system.notifications.schedule.quietHours")}
            description={t(
              "pages.settings.system.notifications.schedule.quietHoursDesc"
            )}
          >
            <Switch
              checked={scheduleSettings.quietHoursEnabled}
              onCheckedChange={(checked) =>
                setScheduleSettings((prev) => ({
                  ...prev,
                  quietHoursEnabled: checked,
                }))
              }
            />
          </SettingRow>

          {scheduleSettings.quietHoursEnabled && (
            <>
              <SettingRow
                title={t(
                  "pages.settings.system.notifications.schedule.quietStart"
                )}
                description={t(
                  "pages.settings.system.notifications.schedule.quietStartDesc"
                )}
                orientation="vertical"
              >
                <Select
                  value={scheduleSettings.quietHoursStart}
                  onValueChange={(value) =>
                    setScheduleSettings((prev) => ({
                      ...prev,
                      quietHoursStart: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                    <SelectItem value="21:00">9:00 PM</SelectItem>
                    <SelectItem value="22:00">10:00 PM</SelectItem>
                    <SelectItem value="23:00">11:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>

              <SettingRow
                title={t(
                  "pages.settings.system.notifications.schedule.quietEnd"
                )}
                description={t(
                  "pages.settings.system.notifications.schedule.quietEndDesc"
                )}
                orientation="vertical"
              >
                <Select
                  value={scheduleSettings.quietHoursEnd}
                  onValueChange={(value) =>
                    setScheduleSettings((prev) => ({
                      ...prev,
                      quietHoursEnd: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00">6:00 AM</SelectItem>
                    <SelectItem value="07:00">7:00 AM</SelectItem>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </>
          )}

          <SettingRow
            title={t(
              "pages.settings.system.notifications.schedule.weekendNotifications"
            )}
            description={t(
              "pages.settings.system.notifications.schedule.weekendNotificationsDesc"
            )}
          >
            <Switch
              checked={scheduleSettings.weekendNotifications}
              onCheckedChange={(checked) =>
                setScheduleSettings((prev) => ({
                  ...prev,
                  weekendNotifications: checked,
                }))
              }
            />
          </SettingRow>

          <SettingRow
            title={t(
              "pages.settings.system.notifications.schedule.urgentOverride"
            )}
            description={t(
              "pages.settings.system.notifications.schedule.urgentOverrideDesc"
            )}
          >
            <Switch
              checked={scheduleSettings.urgentOverride}
              onCheckedChange={(checked) =>
                setScheduleSettings((prev) => ({
                  ...prev,
                  urgentOverride: checked,
                }))
              }
            />
          </SettingRow>
        </SettingsSection>
      </div>
    </PageTemplate>
  );
};

export default NotificationSettingsPage;
