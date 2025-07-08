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
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";

const PlotsPage = () => {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data for plots
  const plots = [
    {
      id: "plot-a",
      name: "Bancal A",
      nodeId: "node-a",
      size: "4x3m",
      status: "optimal",
      crops: [
        {
          name: "Tomates",
          plantedDate: "2024-01-15",
          harvestDate: "2024-04-15",
          icon: "🍅",
        },
        {
          name: "Albahaca",
          plantedDate: "2024-01-20",
          harvestDate: "2024-03-30",
          icon: "🌿",
        },
      ],
      soilMoisture: 68,
      temperature: 24,
      batteryLevel: 85,
      powerGeneration: 240,
      irrigationStatus: "scheduled",
      nextIrrigation: "2 horas",
    },
    {
      id: "plot-b",
      name: "Bancal B",
      nodeId: "node-b",
      size: "3x4m",
      status: "warning",
      crops: [
        {
          name: "Maíz",
          plantedDate: "2024-02-01",
          harvestDate: "2024-05-15",
          icon: "🌽",
        },
        {
          name: "Lechugas",
          plantedDate: "2024-02-10",
          harvestDate: "2024-03-25",
          icon: "🥬",
        },
        {
          name: "Zanahorias",
          plantedDate: "2024-01-25",
          harvestDate: "2024-04-25",
          icon: "🥕",
        },
      ],
      soilMoisture: 45,
      temperature: 26,
      batteryLevel: 62,
      powerGeneration: 180,
      irrigationStatus: "needed",
      nextIrrigation: "Inmediato",
    },
    {
      id: "plot-c",
      name: "Bancal C",
      nodeId: "node-d",
      size: "5x2m",
      status: "optimal",
      crops: [
        {
          name: "Espinacas",
          plantedDate: "2024-01-20",
          harvestDate: "2024-03-20",
          icon: "🥬",
        },
        {
          name: "Rábanos",
          plantedDate: "2024-02-05",
          harvestDate: "2024-03-10",
          icon: "🔴",
        },
      ],
      soilMoisture: 72,
      temperature: 23,
      batteryLevel: 91,
      powerGeneration: 265,
      irrigationStatus: "optimal",
      nextIrrigation: "6 horas",
    },
    {
      id: "plot-d",
      name: "Bancal D",
      nodeId: "node-e",
      size: "4x4m",
      status: "available",
      crops: [],
      soilMoisture: 55,
      temperature: 22,
      batteryLevel: 78,
      powerGeneration: 195,
      irrigationStatus: "disabled",
      nextIrrigation: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-100 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "available":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return "✅";
      case "warning":
        return "⚠️";
      case "available":
        return "🆕";
      default:
        return "❓";
    }
  };

  const breadcrumbItems = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.garden.title"), href: "#" },
    { label: t("navigation.garden.plots"), href: "/garden/plots" },
  ];

  return (
    <PageTemplate
      pageTitle={t("pages.garden.plots.title")}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-background border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              🔲 {t("pages.garden.plots.gridView")}
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              📋 {t("pages.garden.plots.listView")}
            </Button>
          </div>
          <Button>➕ {t("pages.garden.plots.createPlot")}</Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.garden.plots.stats.totalPlots")}
                  </p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <span className="text-2xl">🗺️</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.garden.plots.stats.activeCrops")}
                  </p>
                  <p className="text-2xl font-bold">
                    {plots.reduce(
                      (total, plot) => total + plot.crops.length,
                      0
                    )}
                  </p>
                </div>
                <span className="text-2xl">🌱</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.garden.plots.stats.avgMoisture")}
                  </p>
                  <p className="text-2xl font-bold">62%</p>
                </div>
                <span className="text-2xl">💧</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t("pages.garden.plots.stats.nodesOnline")}
                  </p>
                  <p className="text-2xl font-bold">4/4</p>
                </div>
                <span className="text-2xl">📡</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plots Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-4"
          }
        >
          {plots.map((plot) => (
            <Card key={plot.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <CardTitle className="text-lg">{plot.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {t("pages.garden.plots.nodeId")}:{" "}
                        {plot.nodeId.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(plot.status)}>
                    {getStatusIcon(plot.status)}{" "}
                    {t(`pages.garden.plots.status.${plot.status}`)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Plot Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("pages.garden.plots.size")}
                  </span>
                  <span className="font-medium">{plot.size}</span>
                </div>

                {/* Crops Section - Fixed Height */}
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-medium flex items-center gap-2">
                    🌾 {t("pages.garden.plots.activeCrops")} (
                    {plot.crops.length})
                  </p>
                  {plot.crops.length > 0 ? (
                    <div className="h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      <div className="space-y-2 pr-2">
                        {plot.crops.map((crop, index) => (
                          <div
                            key={index}
                            className="p-2 bg-accent/30 rounded-lg"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">{crop.icon}</span>
                              <span className="font-medium text-sm">
                                {crop.name}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                              <div>
                                <p>{t("pages.garden.plots.planted")}</p>
                                <p className="font-medium text-foreground">
                                  {crop.plantedDate}
                                </p>
                              </div>
                              <div>
                                <p>{t("pages.garden.plots.harvest")}</p>
                                <p className="font-medium text-foreground">
                                  {crop.harvestDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">🌱</span>
                        <p className="text-sm">
                          {t("pages.garden.plots.noCrops")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Node Sensors */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {t("pages.garden.plots.nodeData")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span>💧</span>
                      <span>{plot.soilMoisture}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🌡️</span>
                      <span>{plot.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🔋</span>
                      <span>{plot.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⚡</span>
                      <span>{plot.powerGeneration}W</span>
                    </div>
                  </div>
                </div>

                {/* Irrigation Status */}
                {plot.irrigationStatus !== "disabled" && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("pages.garden.plots.nextIrrigation")}
                      </span>
                      <span
                        className={`font-medium ${
                          plot.irrigationStatus === "needed"
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {plot.nextIrrigation}
                      </span>
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    👁️ {t("pages.garden.plots.viewDetails")}
                  </Button>
                  <Button variant="outline" size="sm">
                    ⚙️
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default PlotsPage;
