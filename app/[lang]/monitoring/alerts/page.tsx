"use client";

import React, { useState } from "react";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/presentation/components/ui/card";
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import {
  Alert,
  AlertDescription,
} from "@/contexts/shared/presentation/components/ui/alert";
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";

// Atomic components
import { StatCard } from "@/contexts/shared/presentation/components/atoms";

const MonitoringAlertsPage = () => {
  const t = useTranslations();
  const [filterBy, setFilterBy] = useState<
    "all" | "active" | "resolved" | "critical"
  >("all");

  // Mock data for alerts
  const alerts = [
    {
      id: "alert-1",
      name: "Low Soil Moisture - Plot A",
      category: "irrigation",
      priority: "high",
      status: "active",
      triggeredAt: "2024-01-15T14:30:00Z",
      resolvedAt: null,
      nodeId: "node-a",
      condition: "Soil moisture < 30%",
      currentValue: "25%",
      threshold: "30%",
      description:
        "Soil moisture in Plot A has dropped below the optimal level",
      location: "Garden Plot A",
      sensor: "Moisture Sensor #1",
      escalated: false,
      snoozedUntil: null,
    },
    {
      id: "alert-2",
      name: "Battery Level Critical - Node C",
      category: "power",
      priority: "critical",
      status: "active",
      triggeredAt: "2024-01-15T16:45:00Z",
      resolvedAt: null,
      nodeId: "node-c",
      condition: "Battery level < 20%",
      currentValue: "15%",
      threshold: "20%",
      description: "Battery level critically low, immediate attention required",
      location: "Garden Plot C",
      sensor: "Power Management Unit",
      escalated: true,
      snoozedUntil: null,
    },
    {
      id: "alert-3",
      name: "High Temperature Warning",
      category: "weather",
      priority: "medium",
      status: "resolved",
      triggeredAt: "2024-01-14T13:20:00Z",
      resolvedAt: "2024-01-14T18:00:00Z",
      nodeId: "node-b",
      condition: "Temperature > 35°C",
      currentValue: "32°C",
      threshold: "35°C",
      description: "Temperature exceeded safe levels for current crops",
      location: "Garden Plot B",
      sensor: "Temperature Sensor #2",
      escalated: false,
      snoozedUntil: null,
    },
    {
      id: "alert-4",
      name: "Connectivity Loss - Node D",
      category: "connectivity",
      priority: "medium",
      status: "snoozed",
      triggeredAt: "2024-01-15T10:15:00Z",
      resolvedAt: null,
      nodeId: "node-d",
      condition: "No data received > 30 minutes",
      currentValue: "45 minutes",
      threshold: "30 minutes",
      description: "Node has stopped sending data",
      location: "Garden Plot D",
      sensor: "Communication Module",
      escalated: false,
      snoozedUntil: "2024-01-15T17:00:00Z",
    },
    {
      id: "alert-5",
      name: "Pest Detection Alert",
      category: "sensor",
      priority: "low",
      status: "active",
      triggeredAt: "2024-01-15T08:30:00Z",
      resolvedAt: null,
      nodeId: "node-a",
      condition: "Unusual movement detected",
      currentValue: "Motion detected",
      threshold: "No motion",
      description: "Camera detected unusual movement in the garden area",
      location: "Garden Plot A",
      sensor: "Motion Camera #1",
      escalated: false,
      snoozedUntil: null,
    },
  ];

  // Breadcrumb configuration
  const breadcrumbItems = [
    {
      label: t("navigation.monitoring.title"),
      href: "/monitoring",
    },
  ];

  // Filter alerts based on selected filter
  const filteredAlerts = alerts.filter((alert) => {
    if (filterBy === "active") return alert.status === "active";
    if (filterBy === "resolved") return alert.status === "resolved";
    if (filterBy === "critical") return alert.priority === "critical";
    return true;
  });

  // Helper functions
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "destructive";
      case "resolved":
        return "default";
      case "snoozed":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "irrigation":
        return "💧";
      case "power":
        return "🔋";
      case "weather":
        return "🌡️";
      case "connectivity":
        return "📶";
      case "sensor":
        return "📡";
      case "hardware":
        return "🔧";
      default:
        return "⚠️";
    }
  };

  const getAlertVariant = (priority: string, status: string) => {
    if (status === "resolved") return "default";
    if (priority === "critical") return "destructive";
    if (priority === "high") return "destructive";
    return "default";
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60)
      );
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const formatFullTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleResolveAlert = (alertId: string) => {
    console.log("Resolving alert:", alertId);
    // TODO: Implement alert resolution logic
  };

  const handleSnoozeAlert = (alertId: string) => {
    console.log("Snoozing alert:", alertId);
    // TODO: Implement alert snooze logic
  };

  const handleEscalateAlert = (alertId: string) => {
    console.log("Escalating alert:", alertId);
    // TODO: Implement alert escalation logic
  };

  // Statistics calculations
  const stats = {
    total: alerts.length,
    active: alerts.filter((a) => a.status === "active").length,
    critical: alerts.filter((a) => a.priority === "critical").length,
    resolvedToday: alerts.filter(
      (a) =>
        a.status === "resolved" &&
        a.resolvedAt &&
        new Date(a.resolvedAt).toDateString() === new Date().toDateString()
    ).length,
  };

  return (
    <PageTemplate
      pageTitle={t("pages.monitoring.alerts.title")}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: Filter controls */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t("pages.monitoring.alerts.filterBy")}:
            </span>
            <div className="flex gap-0.5 bg-background border rounded-md p-1">
              {(["all", "active", "resolved", "critical"] as const).map(
                (filter) => (
                  <Button
                    key={filter}
                    variant={filterBy === filter ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy(filter)}
                    className="px-2 py-1 text-xs"
                  >
                    {t(
                      `pages.monitoring.alerts.filter${
                        filter.charAt(0).toUpperCase() + filter.slice(1)
                      }`
                    )}
                  </Button>
                )
              )}
            </div>
          </div>

          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            {t("pages.monitoring.alerts.createAlert")}
          </Button>
        </div>
      }
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          title={t("pages.monitoring.alerts.stats.totalAlerts")}
          value={stats.total}
          icon="🚨"
        />
        <StatCard
          title={t("pages.monitoring.alerts.stats.activeAlerts")}
          value={stats.active}
          icon="🔴"
        />
        <StatCard
          title={t("pages.monitoring.alerts.stats.criticalAlerts")}
          value={stats.critical}
          icon="⚡"
        />
        <StatCard
          title={t("pages.monitoring.alerts.stats.resolvedToday")}
          value={stats.resolvedToday}
          icon="✅"
        />
      </div>

      {/* Mobile Filter Controls */}
      <div className="md:hidden">
        <div className="flex gap-1 overflow-x-auto pb-2">
          {(["all", "active", "resolved", "critical"] as const).map(
            (filter) => (
              <Button
                key={filter}
                variant={filterBy === filter ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy(filter)}
                className="px-3 py-1 text-xs whitespace-nowrap"
              >
                {t(
                  `pages.monitoring.alerts.filter${
                    filter.charAt(0).toUpperCase() + filter.slice(1)
                  }`
                )}
              </Button>
            )
          )}
        </div>
      </div>

      {/* AI Recommendations Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            🤖 {t("pages.monitoring.alerts.aiRecommendations.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-blue-600 text-lg">🔧</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-blue-900">
                {t(
                  "pages.monitoring.alerts.aiRecommendations.preventiveMaintenance"
                )}
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                {t(
                  "pages.monitoring.alerts.aiRecommendations.preventiveMaintenanceDesc"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-600 text-lg">💧</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-green-900">
                {t(
                  "pages.monitoring.alerts.aiRecommendations.irrigationOptimization"
                )}
              </h4>
              <p className="text-sm text-green-700 mt-1">
                {t(
                  "pages.monitoring.alerts.aiRecommendations.irrigationOptimizationDesc"
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={getAlertVariant(alert.priority, alert.status)}
            className="relative"
          >
            <div className="flex items-start justify-between w-full">
              {/* Left side - Alert content */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Category icon */}
                <span className="text-xl flex-shrink-0 mt-1">
                  {getCategoryIcon(alert.category)}
                </span>

                {/* Alert content */}
                <div className="flex-1 min-w-0">
                  {/* Alert title and badges */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight">
                        {alert.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={getPriorityVariant(alert.priority)}
                          className="text-xs"
                        >
                          {t(
                            `pages.monitoring.alerts.priority.${alert.priority}`
                          )}
                        </Badge>
                        <Badge
                          variant={getStatusVariant(alert.status)}
                          className="text-xs"
                        >
                          {t(`pages.monitoring.alerts.status.${alert.status}`)}
                        </Badge>
                        {alert.escalated && (
                          <Badge variant="destructive" className="text-xs">
                            🚨 Escalated
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Alert description */}
                  <AlertDescription className="text-sm mb-2">
                    {alert.description}
                  </AlertDescription>

                  {/* Alert details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground mb-3">
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {alert.location}
                    </div>
                    <div>
                      <span className="font-medium">Node:</span> {alert.nodeId}
                    </div>
                    <div>
                      <span className="font-medium">Sensor:</span>{" "}
                      {alert.sensor}
                    </div>
                  </div>

                  {/* Condition and values */}
                  <div className="bg-muted/50 p-2 rounded text-xs mb-3">
                    <div className="font-mono mb-1">{alert.condition}</div>
                    <div className="flex gap-4">
                      <span>
                        <span className="font-medium">Current:</span>{" "}
                        <span className="text-red-600 font-medium">
                          {alert.currentValue}
                        </span>
                      </span>
                      <span>
                        <span className="font-medium">Threshold:</span>{" "}
                        {alert.threshold}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {alert.status === "active" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleResolveAlert(alert.id)}
                        className="text-xs h-7"
                      >
                        ✅ {t("pages.monitoring.alerts.actions.resolve")}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSnoozeAlert(alert.id)}
                        className="text-xs h-7"
                      >
                        ⏰ {t("pages.monitoring.alerts.actions.snooze")}
                      </Button>
                      {!alert.escalated && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEscalateAlert(alert.id)}
                          className="text-xs h-7"
                        >
                          🚨 {t("pages.monitoring.alerts.actions.escalate")}
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-xs h-7">
                        👁️ {t("pages.monitoring.alerts.actions.viewDetails")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Timestamp */}
              <div className="flex flex-col items-end text-right flex-shrink-0 ml-4">
                <div className="text-xs text-muted-foreground">
                  {formatTimestamp(alert.triggeredAt)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatFullTimestamp(alert.triggeredAt)}
                </div>
                {alert.resolvedAt && (
                  <div className="text-xs text-green-600 mt-1">
                    Resolved: {formatTimestamp(alert.resolvedAt)}
                  </div>
                )}
                {alert.snoozedUntil && (
                  <div className="text-xs text-yellow-600 mt-1">
                    Snoozed until:{" "}
                    {new Date(alert.snoozedUntil).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </Alert>
        ))}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <Alert className="p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
          <AlertDescription>
            {filterBy === "all"
              ? "All systems are running smoothly!"
              : `No ${filterBy} alerts at this time.`}
          </AlertDescription>
        </Alert>
      )}
    </PageTemplate>
  );
};

export default MonitoringAlertsPage;
