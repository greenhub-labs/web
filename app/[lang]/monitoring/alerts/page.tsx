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
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/contexts/shared/presentation/components/ui/dropdown-menu";

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
      description:
        "Triggers when the soil moisture goes to or below 30% for 1 consecutive minutes",
      category: "irrigation",
      priority: "high",
      status: "active",
      triggeredAt: "2024-01-15T14:30:00Z",
      resolvedAt: null,
      nodeId: "node-a",
      condition: "Soil moisture < 30%",
      currentValue: "25%",
      threshold: "30%",
      location: "Garden Plot A",
      sensor: "Moisture Sensor #1",
      escalated: false,
      snoozedUntil: null,
    },
    {
      id: "alert-2",
      name: "Battery Level Critical - Node C",
      description:
        "Triggers when the battery level of any node goes to or below 20% for 5 consecutive minutes",
      category: "power",
      priority: "critical",
      status: "active",
      triggeredAt: "2024-01-15T16:45:00Z",
      resolvedAt: null,
      nodeId: "node-c",
      condition: "Battery level < 20%",
      currentValue: "15%",
      threshold: "20%",
      location: "Garden Plot C",
      sensor: "Power Management Unit",
      escalated: true,
      snoozedUntil: null,
    },
    {
      id: "alert-3",
      name: "High Temperature Warning",
      description:
        "Triggers when the temperature goes to or above 35°C for 2 consecutive minutes",
      category: "weather",
      priority: "medium",
      status: "resolved",
      triggeredAt: "2024-01-14T13:20:00Z",
      resolvedAt: "2024-01-14T18:00:00Z",
      nodeId: "node-b",
      condition: "Temperature > 35°C",
      currentValue: "32°C",
      threshold: "35°C",
      location: "Garden Plot B",
      sensor: "Temperature Sensor #2",
      escalated: false,
      snoozedUntil: null,
    },
    {
      id: "alert-4",
      name: "Connectivity Loss - Node D",
      description:
        "Triggers when no data received from node for more than 30 consecutive minutes",
      category: "connectivity",
      priority: "medium",
      status: "snoozed",
      triggeredAt: "2024-01-15T10:15:00Z",
      resolvedAt: null,
      nodeId: "node-d",
      condition: "No data received > 30 minutes",
      currentValue: "45 minutes",
      threshold: "30 minutes",
      location: "Garden Plot D",
      sensor: "Communication Module",
      escalated: false,
      snoozedUntil: "2024-01-15T17:00:00Z",
    },
    {
      id: "alert-5",
      name: "Pest Detection Alert",
      description:
        "Triggers when camera detects unusual movement patterns for 3 consecutive minutes",
      category: "sensor",
      priority: "low",
      status: "active",
      triggeredAt: "2024-01-15T08:30:00Z",
      resolvedAt: null,
      nodeId: "node-a",
      condition: "Unusual movement detected",
      currentValue: "Motion detected",
      threshold: "No motion",
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "🔴";
      case "resolved":
        return "✅";
      case "snoozed":
        return "⏸️";
      default:
        return "⚠️";
    }
  };

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
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      ", " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
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

      {/* Alerts List Header */}
      <div className="bg-background border rounded-lg">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b bg-muted/30 text-sm font-medium text-muted-foreground">
          <div className="col-span-1">STATUS</div>
          <div className="col-span-4">NAME</div>
          <div className="col-span-2">SERVICE</div>
          <div className="col-span-1">SEVERITY</div>
          <div className="col-span-2">LAST TRIGGER</div>
          <div className="col-span-1">NODE</div>
          <div className="col-span-1"></div>
        </div>

        {/* Alerts List */}
        <div className="divide-y">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 hover:bg-muted/30 transition-colors"
            >
              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                {/* Status Icon */}
                <div className="col-span-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {getStatusIcon(alert.status)}
                    </span>
                  </div>
                </div>

                {/* Name & Description */}
                <div className="col-span-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">{alert.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {alert.description}
                    </p>
                  </div>
                </div>

                {/* Service */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {getCategoryIcon(alert.category)}
                    </span>
                    <span className="text-sm font-medium">
                      {t(`pages.monitoring.alerts.category.${alert.category}`)}
                    </span>
                  </div>
                </div>

                {/* Severity */}
                <div className="col-span-1">
                  <Badge
                    variant={getPriorityVariant(alert.priority)}
                    className="text-xs"
                  >
                    {t(`pages.monitoring.alerts.priority.${alert.priority}`)}
                  </Badge>
                </div>

                {/* Last Trigger */}
                <div className="col-span-2">
                  <div className="space-y-1 text-xs">
                    <div className="font-medium">
                      {formatDate(alert.triggeredAt)}
                    </div>
                    <div className="text-muted-foreground">
                      {formatTimestamp(alert.triggeredAt)}
                    </div>
                  </div>
                </div>

                {/* Node */}
                <div className="col-span-1">
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {alert.nodeId}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="text-lg">⋯</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => console.log("View details:", alert.id)}
                      >
                        👁️ {t("pages.monitoring.alerts.actions.viewDetails")}
                      </DropdownMenuItem>
                      {alert.status === "active" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            ✅ {t("pages.monitoring.alerts.actions.resolve")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSnoozeAlert(alert.id)}
                          >
                            ⏰ {t("pages.monitoring.alerts.actions.snooze")}
                          </DropdownMenuItem>
                          {!alert.escalated && (
                            <DropdownMenuItem
                              onClick={() => handleEscalateAlert(alert.id)}
                            >
                              🚨 {t("pages.monitoring.alerts.actions.escalate")}
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-lg flex-shrink-0">
                      {getStatusIcon(alert.status)}
                    </span>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-sm">{alert.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {alert.description}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="text-lg">⋯</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => console.log("View details:", alert.id)}
                      >
                        👁️ {t("pages.monitoring.alerts.actions.viewDetails")}
                      </DropdownMenuItem>
                      {alert.status === "active" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            ✅ {t("pages.monitoring.alerts.actions.resolve")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSnoozeAlert(alert.id)}
                          >
                            ⏰ {t("pages.monitoring.alerts.actions.snooze")}
                          </DropdownMenuItem>
                          {!alert.escalated && (
                            <DropdownMenuItem
                              onClick={() => handleEscalateAlert(alert.id)}
                            >
                              🚨 {t("pages.monitoring.alerts.actions.escalate")}
                            </DropdownMenuItem>
                          )}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span>{getCategoryIcon(alert.category)}</span>
                      <span>
                        {t(
                          `pages.monitoring.alerts.category.${alert.category}`
                        )}
                      </span>
                    </div>
                    <Badge
                      variant={getPriorityVariant(alert.priority)}
                      className="text-xs"
                    >
                      {t(`pages.monitoring.alerts.priority.${alert.priority}`)}
                    </Badge>
                    <span className="font-mono bg-muted px-2 py-1 rounded">
                      {alert.nodeId}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    {formatTimestamp(alert.triggeredAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="text-center py-12 bg-background border rounded-lg">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
          <p className="text-muted-foreground">
            {filterBy === "all"
              ? "All systems are running smoothly!"
              : `No ${filterBy} alerts at this time.`}
          </p>
        </div>
      )}
    </PageTemplate>
  );
};

export default MonitoringAlertsPage;
