"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";

// UI Components
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import { Input } from "@/contexts/shared/presentation/components/ui/input";
import { Switch } from "@/contexts/shared/presentation/components/ui/switch";
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/presentation/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/contexts/shared/presentation/components/ui/dialog";

// Atomic Design Components
import { StatCard } from "@/contexts/shared/presentation/components/atoms/StatCard";
import { SettingsSection } from "@/contexts/shared/presentation/components/molecules/SettingsSection";

// Icons
import {
  Cloud,
  Wifi,
  Smartphone,
  MessageCircle,
  Calendar,
  Database,
  Settings,
  Check,
  X,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  features: string;
  icon: string;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
  config?: {
    apiKey?: string;
    username?: string;
    token?: string;
    syncInterval?: string;
    notifications?: boolean;
  };
}

const IntegrationsPage: React.FC = () => {
  const t = useTranslations("pages.settings.integrations");
  const tCommon = useTranslations("common");
  const tNavigation = useTranslations("navigation");

  // Mock integrations data
  const [integrations, setIntegrations] = useState<{
    [category: string]: Integration[];
  }>({
    weather: [
      {
        id: "openweathermap",
        name: t("weather.openWeatherMap.name"),
        description: t("weather.openWeatherMap.description"),
        features: t("weather.openWeatherMap.features"),
        icon: "🌤️",
        status: "connected",
        lastSync: "2024-01-15T10:30:00Z",
        config: {
          apiKey: "*********************",
          syncInterval: "1hour",
          notifications: true,
        },
      },
      {
        id: "accuweather",
        name: t("weather.accuWeather.name"),
        description: t("weather.accuWeather.description"),
        features: t("weather.accuWeather.features"),
        icon: "🌦️",
        status: "disconnected",
      },
      {
        id: "weatherunderground",
        name: t("weather.weatherUnderground.name"),
        description: t("weather.weatherUnderground.description"),
        features: t("weather.weatherUnderground.features"),
        icon: "🌡️",
        status: "disconnected",
      },
    ],
    iot: [
      {
        id: "arduinocloud",
        name: t("iot.arduinoCloud.name"),
        description: t("iot.arduinoCloud.description"),
        features: t("iot.arduinoCloud.features"),
        icon: "🔌",
        status: "connected",
        lastSync: "2024-01-15T09:15:00Z",
        config: {
          username: "garden_user",
          token: "*********************",
          syncInterval: "15min",
          notifications: true,
        },
      },
      {
        id: "particle",
        name: t("iot.particle.name"),
        description: t("iot.particle.description"),
        features: t("iot.particle.features"),
        icon: "⚡",
        status: "error",
        lastSync: "2024-01-14T15:20:00Z",
      },
      {
        id: "thingspeak",
        name: t("iot.thingSpeak.name"),
        description: t("iot.thingSpeak.description"),
        features: t("iot.thingSpeak.features"),
        icon: "📊",
        status: "disconnected",
      },
    ],
    smartHome: [
      {
        id: "homeassistant",
        name: t("smartHome.homeAssistant.name"),
        description: t("smartHome.homeAssistant.description"),
        features: t("smartHome.homeAssistant.features"),
        icon: "🏠",
        status: "connected",
        lastSync: "2024-01-15T11:00:00Z",
        config: {
          apiKey: "*********************",
          syncInterval: "5min",
          notifications: false,
        },
      },
      {
        id: "googlehome",
        name: t("smartHome.googleHome.name"),
        description: t("smartHome.googleHome.description"),
        features: t("smartHome.googleHome.features"),
        icon: "🗣️",
        status: "disconnected",
      },
      {
        id: "alexa",
        name: t("smartHome.alexa.name"),
        description: t("smartHome.alexa.description"),
        features: t("smartHome.alexa.features"),
        icon: "🔊",
        status: "disconnected",
      },
    ],
    communication: [
      {
        id: "slack",
        name: t("communication.slack.name"),
        description: t("communication.slack.description"),
        features: t("communication.slack.features"),
        icon: "💬",
        status: "connected",
        lastSync: "2024-01-15T10:45:00Z",
        config: {
          token: "*********************",
          syncInterval: "manual",
          notifications: true,
        },
      },
      {
        id: "discord",
        name: t("communication.discord.name"),
        description: t("communication.discord.description"),
        features: t("communication.discord.features"),
        icon: "🎮",
        status: "disconnected",
      },
      {
        id: "telegram",
        name: t("communication.telegram.name"),
        description: t("communication.telegram.description"),
        features: t("communication.telegram.features"),
        icon: "📱",
        status: "disconnected",
      },
      {
        id: "whatsapp",
        name: t("communication.whatsapp.name"),
        description: t("communication.whatsapp.description"),
        features: t("communication.whatsapp.features"),
        icon: "📞",
        status: "disconnected",
      },
    ],
    agriculture: [
      {
        id: "plantnet",
        name: t("agriculture.plantNet.name"),
        description: t("agriculture.plantNet.description"),
        features: t("agriculture.plantNet.features"),
        icon: "🌿",
        status: "disconnected",
      },
      {
        id: "inaturalist",
        name: t("agriculture.iNaturalist.name"),
        description: t("agriculture.iNaturalist.description"),
        features: t("agriculture.iNaturalist.features"),
        icon: "🦋",
        status: "disconnected",
      },
      {
        id: "gardentags",
        name: t("agriculture.gardenTags.name"),
        description: t("agriculture.gardenTags.description"),
        features: t("agriculture.gardenTags.features"),
        icon: "📷",
        status: "disconnected",
      },
    ],
    storage: [
      {
        id: "googledrive",
        name: t("storage.googleDrive.name"),
        description: t("storage.googleDrive.description"),
        features: t("storage.googleDrive.features"),
        icon: "☁️",
        status: "connected",
        lastSync: "2024-01-15T08:30:00Z",
        config: {
          token: "*********************",
          syncInterval: "daily",
          notifications: false,
        },
      },
      {
        id: "dropbox",
        name: t("storage.dropbox.name"),
        description: t("storage.dropbox.description"),
        features: t("storage.dropbox.features"),
        icon: "📦",
        status: "disconnected",
      },
      {
        id: "onedrive",
        name: t("storage.oneDrive.name"),
        description: t("storage.oneDrive.description"),
        features: t("storage.oneDrive.features"),
        icon: "🗂️",
        status: "disconnected",
      },
    ],
    calendar: [
      {
        id: "googlecalendar",
        name: t("calendar.googleCalendar.name"),
        description: t("calendar.googleCalendar.description"),
        features: t("calendar.googleCalendar.features"),
        icon: "📅",
        status: "connected",
        lastSync: "2024-01-15T07:00:00Z",
        config: {
          token: "*********************",
          syncInterval: "6hours",
          notifications: true,
        },
      },
      {
        id: "outlook",
        name: t("calendar.outlook.name"),
        description: t("calendar.outlook.description"),
        features: t("calendar.outlook.features"),
        icon: "📧",
        status: "disconnected",
      },
      {
        id: "apple",
        name: t("calendar.apple.name"),
        description: t("calendar.apple.description"),
        features: t("calendar.apple.features"),
        icon: "🍎",
        status: "disconnected",
      },
    ],
  });

  // State for configuration dialogs
  const [configDialog, setConfigDialog] = useState<{
    open: boolean;
    integration: Integration | null;
  }>({ open: false, integration: null });

  const [formData, setFormData] = useState<{
    apiKey: string;
    username: string;
    token: string;
    syncInterval: string;
    notifications: boolean;
  }>({
    apiKey: "",
    username: "",
    token: "",
    syncInterval: "1hour",
    notifications: true,
  });

  const [showSecrets, setShowSecrets] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Calculate stats
  const allIntegrations = Object.values(integrations).flat();
  const connectedCount = allIntegrations.filter(
    (i) => i.status === "connected"
  ).length;
  const totalCount = allIntegrations.length;
  const lastSyncTime = allIntegrations
    .filter((i) => i.lastSync)
    .sort(
      (a, b) =>
        new Date(b.lastSync!).getTime() - new Date(a.lastSync!).getTime()
    )[0]?.lastSync;

  const formatLastSync = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  const handleConnect = (integration: Integration) => {
    if (integration.status === "connected") {
      // Disconnect
      setIntegrations((prev) => ({
        ...prev,
        [getCategoryByIntegration(integration.id)]: prev[
          getCategoryByIntegration(integration.id)
        ].map((i) =>
          i.id === integration.id
            ? {
                ...i,
                status: "disconnected",
                lastSync: undefined,
                config: undefined,
              }
            : i
        ),
      }));
    } else {
      // Open configuration dialog
      setConfigDialog({ open: true, integration });
      setFormData({
        apiKey: integration.config?.apiKey?.replace(/\*/g, "") || "",
        username: integration.config?.username || "",
        token: integration.config?.token?.replace(/\*/g, "") || "",
        syncInterval: integration.config?.syncInterval || "1hour",
        notifications: integration.config?.notifications ?? true,
      });
    }
  };

  const handleSaveConfig = async () => {
    if (!configDialog.integration) return;

    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const category = getCategoryByIntegration(configDialog.integration.id);
    setIntegrations((prev) => ({
      ...prev,
      [category]: prev[category].map((i) =>
        i.id === configDialog.integration!.id
          ? {
              ...i,
              status: "connected" as const,
              lastSync: new Date().toISOString(),
              config: {
                apiKey: formData.apiKey
                  ? "*".repeat(formData.apiKey.length)
                  : undefined,
                username: formData.username || undefined,
                token: formData.token
                  ? "*".repeat(formData.token.length)
                  : undefined,
                syncInterval: formData.syncInterval,
                notifications: formData.notifications,
              },
            }
          : i
      ),
    }));

    setIsSaving(false);
    setConfigDialog({ open: false, integration: null });
  };

  const getCategoryByIntegration = (integrationId: string): string => {
    for (const [category, items] of Object.entries(integrations)) {
      if (items.some((item) => item.id === integrationId)) {
        return category;
      }
    }
    return "";
  };

  const handleSync = (integration: Integration) => {
    const category = getCategoryByIntegration(integration.id);
    setIntegrations((prev) => ({
      ...prev,
      [category]: prev[category].map((i) =>
        i.id === integration.id
          ? { ...i, lastSync: new Date().toISOString() }
          : i
      ),
    }));
  };

  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 text-xs"
          >
            <Check className="h-3 w-3 mr-1" />
            {t("status.connected")}
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive" className="text-xs">
            <X className="h-3 w-3 mr-1" />
            {t("status.error")}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {t("status.disconnected")}
          </Badge>
        );
    }
  };

  const renderIntegrationCard = (integration: Integration) => (
    <div
      key={integration.id}
      className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow"
    >
      {/* Mobile-first responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="text-2xl shrink-0">{integration.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h4 className="font-medium text-sm truncate">
                {integration.name}
              </h4>
              {getStatusBadge(integration.status)}
            </div>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {integration.description}
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>{t("labels.features")}:</strong> {integration.features}
            </p>
          </div>
        </div>

        {/* Action buttons - responsive stacking */}
        <div className="flex flex-row sm:flex-col gap-2 shrink-0">
          <Button
            size="sm"
            variant={integration.status === "connected" ? "outline" : "default"}
            onClick={() => handleConnect(integration)}
            className="flex-1 sm:flex-none text-xs"
          >
            {integration.status === "connected"
              ? t("actions.disconnect")
              : t("actions.connect")}
          </Button>
          {integration.status === "connected" && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleSync(integration)}
              className="flex-1 sm:flex-none text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">{t("actions.sync")}</span>
              <span className="sm:hidden">Sync</span>
            </Button>
          )}
        </div>
      </div>

      {/* Last sync info */}
      {integration.status === "connected" && integration.lastSync && (
        <div className="pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {t("stats.lastSync")}: {formatLastSync(integration.lastSync)}
          </span>
        </div>
      )}
    </div>
  );

  const breadcrumbItems = [
    {
      label: tNavigation("settings.title"),
      href: "/settings",
    },
  ];

  return (
    <PageTemplate
      pageTitle={tNavigation("settings.integrations")}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-6 px-1 sm:px-0">
        {/* Stats - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title={t("stats.connectedServices")}
            value={connectedCount.toString()}
            icon="🔗"
          />
          <StatCard
            title={t("stats.activeIntegrations")}
            value={`${connectedCount}/${totalCount}`}
            icon="⚡"
          />
          <StatCard
            title={t("stats.lastSync")}
            value={formatLastSync(lastSyncTime)}
            icon="🔄"
          />
          <StatCard
            title={t("stats.totalDataPoints")}
            value="1,247"
            icon="📊"
          />
        </div>

        {/* Weather Services */}
        <SettingsSection
          title={t("weather.title")}
          subtitle={t("weather.subtitle")}
        >
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.weather.map(renderIntegrationCard)}
          </div>
        </SettingsSection>

        {/* IoT Platforms */}
        <SettingsSection title={t("iot.title")} subtitle={t("iot.subtitle")}>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.iot.map(renderIntegrationCard)}
          </div>
        </SettingsSection>

        {/* Smart Home */}
        <SettingsSection
          title={t("smartHome.title")}
          subtitle={t("smartHome.subtitle")}
        >
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.smartHome.map(renderIntegrationCard)}
          </div>
        </SettingsSection>

        {/* Communication */}
        <SettingsSection
          title={t("communication.title")}
          subtitle={t("communication.subtitle")}
        >
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.communication.map(renderIntegrationCard)}
          </div>
        </SettingsSection>

        {/* Agriculture Platforms */}
        <SettingsSection
          title={t("agriculture.title")}
          subtitle={t("agriculture.subtitle")}
        >
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.agriculture.map(renderIntegrationCard)}
          </div>
        </SettingsSection>

        {/* Cloud Storage */}
        <SettingsSection
          title={t("storage.title")}
          subtitle={t("storage.subtitle")}
        >
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.storage.map(renderIntegrationCard)}
          </div>
        </SettingsSection>

        {/* Calendar Integration */}
        <SettingsSection
          title={t("calendar.title")}
          subtitle={t("calendar.subtitle")}
        >
          <div className="grid gap-3 sm:gap-4 grid-cols-1 xl:grid-cols-2">
            {integrations.calendar.map(renderIntegrationCard)}
          </div>
        </SettingsSection>
      </div>

      {/* Configuration Dialog - Mobile responsive */}
      <Dialog
        open={configDialog.open}
        onOpenChange={(open) => setConfigDialog({ open, integration: null })}
      >
        <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-lg">
              {t("actions.configure")} {configDialog.integration?.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {configDialog.integration?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* API Key Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("form.apiKey")}</label>
              <div className="relative">
                <Input
                  type={showSecrets ? "text" : "password"}
                  placeholder={t("form.apiKeyPlaceholder")}
                  value={formData.apiKey}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, apiKey: e.target.value }))
                  }
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("form.username")}
              </label>
              <Input
                placeholder={t("form.usernamePlaceholder")}
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>

            {/* Sync Interval */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("form.syncInterval")}
              </label>
              <Select
                value={formData.syncInterval}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, syncInterval: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">
                    {t("intervals.manual")}
                  </SelectItem>
                  <SelectItem value="5min">{t("intervals.5min")}</SelectItem>
                  <SelectItem value="15min">{t("intervals.15min")}</SelectItem>
                  <SelectItem value="30min">{t("intervals.30min")}</SelectItem>
                  <SelectItem value="1hour">{t("intervals.1hour")}</SelectItem>
                  <SelectItem value="6hours">
                    {t("intervals.6hours")}
                  </SelectItem>
                  <SelectItem value="12hours">
                    {t("intervals.12hours")}
                  </SelectItem>
                  <SelectItem value="daily">{t("intervals.daily")}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {t("form.syncIntervalDesc")}
              </p>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <label className="text-sm font-medium">
                  {t("form.enableNotifications")}
                </label>
                <p className="text-xs text-muted-foreground">
                  {t("form.notificationsDesc")}
                </p>
              </div>
              <Switch
                checked={formData.notifications}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, notifications: checked }))
                }
                className="shrink-0"
              />
            </div>

            {/* Action Buttons - Mobile responsive */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                variant="outline"
                className="order-2 sm:order-1"
                onClick={() =>
                  setConfigDialog({ open: false, integration: null })
                }
              >
                {tCommon("cancel")}
              </Button>
              <Button
                className="order-1 sm:order-2"
                onClick={handleSaveConfig}
                disabled={isSaving}
              >
                {isSaving ? t("status.configuring") : tCommon("save")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default IntegrationsPage;
