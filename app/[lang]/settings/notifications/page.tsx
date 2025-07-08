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

  const handleSaveSettings = async () => {
    // Simulate API call
    console.log("Saving notification settings...", {
      notificationMethods,
      alertTypes,
      scheduleSettings,
      emailSettings,
    });
  };

  return (
    <PageTemplate pageTitle={t("navigation.settings.notifications")}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t("pages.settings.system.notifications.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("pages.settings.system.notifications.subtitle")}
            </p>
          </div>
        </div>

        {/* Notification Methods */}
        <SettingsSection
          title={t("pages.settings.system.notifications.title")}
          subtitle={t("pages.settings.system.notifications.subtitle")}
        >
          <SettingRow
            title={t("pages.settings.system.notifications.emailNotifications")}
            description="Receive notifications via email"
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
            description="Receive push notifications on your device"
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
            description="Receive critical alerts via SMS"
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
          subtitle="Configure which types of alerts you want to receive"
        >
          <SettingRow
            title={t("pages.settings.system.notifications.criticalAlerts")}
            description="Important system alerts and failures"
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
            description="Maintenance reminders and scheduled tasks"
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
            description="Weather warnings and alerts"
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
            description="Harvest and planting reminders"
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
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </SettingsSection>

        {/* Notification Schedule */}
        <SettingsSection
          title="Notification Schedule"
          subtitle="Control when you receive notifications"
        >
          <SettingRow
            title="Enable Quiet Hours"
            description="Reduce non-critical notifications during specified hours"
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
                title="Quiet Hours Start"
                description="Time when quiet hours begin"
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
                title="Quiet Hours End"
                description="Time when quiet hours end"
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
            title="Weekend Notifications"
            description="Receive notifications during weekends"
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
            title="Urgent Override"
            description="Allow critical alerts to bypass quiet hours"
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline">
            {t("pages.settings.system.actions.cancel")}
          </Button>
          <Button onClick={handleSaveSettings}>
            {t("pages.settings.system.actions.save")}
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default NotificationSettingsPage;
