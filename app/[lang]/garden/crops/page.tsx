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
import { CreateCropDialog } from "@/contexts/shared/presentation/components/organisms/CreateCropDialog";
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";

const CropsPage = () => {
  const t = useTranslations();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterBy, setFilterBy] = useState<"all" | "active" | "ready">("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateCrop = async (cropData: any) => {
    // TODO: Implement crop creation logic
    console.log("Creating crop:", cropData);
    // Here you would typically call an API to create the crop
  };

  // Mock data for crops
  const crops = [
    {
      id: "crop-1",
      name: "Tomates Cherry",
      variety: "Sweet 100",
      icon: "🍅",
      plotId: "plot-a",
      plotName: "Bancal A",
      plantedDate: "2024-01-15",
      harvestDate: "2024-04-15",
      status: "flowering",
      growth: 75,
      expectedYield: "2.5kg",
      currentYield: "0.8kg",
      daysToHarvest: 12,
      healthScore: 92,
      irrigationNeeds: "medium",
      pests: [],
      diseases: [],
      temperature: 24,
      humidity: 68,
    },
    {
      id: "crop-2",
      name: "Albahaca",
      variety: "Genovese",
      icon: "🌿",
      plotId: "plot-a",
      plotName: "Bancal A",
      plantedDate: "2024-01-20",
      harvestDate: "2024-03-30",
      status: "ready",
      growth: 100,
      expectedYield: "0.8kg",
      currentYield: "0.8kg",
      daysToHarvest: 0,
      healthScore: 88,
      irrigationNeeds: "low",
      pests: [],
      diseases: [],
      temperature: 22,
      humidity: 65,
    },
    {
      id: "crop-3",
      name: "Lechugas",
      variety: "Batavia",
      icon: "🥬",
      plotId: "plot-b",
      plotName: "Bancal B",
      plantedDate: "2024-02-01",
      harvestDate: "2024-04-01",
      status: "growing",
      growth: 60,
      expectedYield: "1.2kg",
      currentYield: "0.3kg",
      daysToHarvest: 25,
      healthScore: 85,
      irrigationNeeds: "high",
      pests: ["aphids"],
      diseases: [],
      temperature: 18,
      humidity: 72,
    },
    {
      id: "crop-4",
      name: "Zanahorias",
      variety: "Nantes",
      icon: "🥕",
      plotId: "plot-c",
      plotName: "Bancal C",
      plantedDate: "2024-01-10",
      harvestDate: "2024-05-10",
      status: "growing",
      growth: 45,
      expectedYield: "3.0kg",
      currentYield: "0kg",
      daysToHarvest: 45,
      healthScore: 90,
      irrigationNeeds: "medium",
      pests: [],
      diseases: [],
      temperature: 20,
      humidity: 70,
    },
    {
      id: "crop-5",
      name: "Espinacas",
      variety: "Baby Leaf",
      icon: "🥬",
      plotId: "plot-b",
      plotName: "Bancal B",
      plantedDate: "2024-02-15",
      harvestDate: "2024-04-15",
      status: "seedling",
      growth: 25,
      expectedYield: "1.5kg",
      currentYield: "0kg",
      daysToHarvest: 35,
      healthScore: 95,
      irrigationNeeds: "medium",
      pests: [],
      diseases: [],
      temperature: 16,
      humidity: 68,
    },
  ];

  // Breadcrumb configuration
  const breadcrumbItems = [
    {
      label: t("navigation.garden.title"),
      href: "/garden",
    },
  ];

  // Filter crops based on selected filter
  const filteredCrops = crops.filter((crop) => {
    if (filterBy === "active") return crop.status !== "ready";
    if (filterBy === "ready") return crop.status === "ready";
    return true;
  });

  // Status helpers
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "flowering":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "growing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "seedling":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return "✅";
      case "flowering":
        return "🌸";
      case "growing":
        return "🌱";
      case "seedling":
        return "🌰";
      default:
        return "❓";
    }
  };

  const getIrrigationColor = (needs: string) => {
    switch (needs) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // Calculate stats
  const readyCrops = crops.filter((crop) => crop.status === "ready").length;
  const totalYield = crops.reduce(
    (sum, crop) => sum + parseFloat(crop.currentYield.replace("kg", "")),
    0
  );
  const avgHealth = Math.round(
    crops.reduce((sum, crop) => sum + crop.healthScore, 0) / crops.length
  );

  return (
    <PageTemplate
      pageTitle={t("pages.garden.crops.title")}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: Todos los controles */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3 py-2 text-sm"
              >
                🔲 {t("pages.garden.crops.gridView")}
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3 py-2 text-sm"
              >
                📋 {t("pages.garden.crops.listView")}
              </Button>
            </div>
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={filterBy === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("all")}
                className="px-3 py-2 text-sm"
              >
                🌾 {t("pages.garden.crops.filterAll")}
              </Button>
              <Button
                variant={filterBy === "active" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("active")}
                className="px-3 py-2 text-sm"
              >
                🌱 {t("pages.garden.crops.filterActive")}
              </Button>
              <Button
                variant={filterBy === "ready" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilterBy("ready")}
                className="px-3 py-2 text-sm"
              >
                ✅ {t("pages.garden.crops.filterReady")}
              </Button>
            </div>
            <Button
              className="px-3 py-2 text-sm"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ➕ {t("pages.garden.crops.plantNew")}
            </Button>
          </div>

          {/* Mobile: Solo View Toggle + Add */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-0.5">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                🔲
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                📋
              </Button>
            </div>
            <Button
              className="h-8 w-8 p-0"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              ➕
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-3 md:space-y-6">
        {/* Mobile Filters */}
        <div className="md:hidden">
          <Card>
            <CardContent className="p-3">
              <div className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("pages.garden.crops.filterBy")}:
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant={filterBy === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("all")}
                    className="flex-1 h-8 text-xs px-2"
                  >
                    🌾 {t("pages.garden.crops.filterAll")}
                  </Button>
                  <Button
                    variant={filterBy === "active" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("active")}
                    className="flex-1 h-8 text-xs px-2"
                  >
                    🌱 {t("pages.garden.crops.filterActive")}
                  </Button>
                  <Button
                    variant={filterBy === "ready" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilterBy("ready")}
                    className="flex-1 h-8 text-xs px-2"
                  >
                    ✅ {t("pages.garden.crops.filterReady")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("pages.garden.crops.stats.totalCrops")}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {crops.length}
                  </p>
                </div>
                <span className="text-xl sm:text-2xl">🌾</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("pages.garden.crops.stats.readyToHarvest")}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{readyCrops}</p>
                </div>
                <span className="text-xl sm:text-2xl">✅</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("pages.garden.crops.stats.totalYield")}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {totalYield.toFixed(1)}kg
                  </p>
                </div>
                <span className="text-xl sm:text-2xl">⚖️</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("pages.garden.crops.stats.avgHealth")}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{avgHealth}%</p>
                </div>
                <span className="text-xl sm:text-2xl">💚</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crops Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">{crop.icon}</span>
                    <div>
                      <CardTitle className="text-base sm:text-lg">
                        {crop.name}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {crop.variety} • {crop.plotName}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      crop.status
                    )} text-xs sm:text-sm`}
                  >
                    {getStatusIcon(crop.status)}{" "}
                    {t(`pages.garden.crops.status.${crop.status}`)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4">
                {/* Growth Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">
                      {t("pages.garden.crops.growth")}
                    </span>
                    <span className="font-medium">{crop.growth}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${crop.growth}%` }}
                    ></div>
                  </div>
                </div>

                {/* Yield & Health */}
                <Separator />
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">
                      {t("pages.garden.crops.yield")}
                    </p>
                    <p className="font-medium">
                      {crop.currentYield}/{crop.expectedYield}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">
                      {t("pages.garden.crops.health")}
                    </p>
                    <p className="font-medium">{crop.healthScore}%</p>
                  </div>
                </div>

                {/* Days to Harvest */}
                {crop.daysToHarvest > 0 && (
                  <div className="bg-accent/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">📅</span>
                      <span className="text-xs sm:text-sm font-medium">
                        {crop.daysToHarvest}{" "}
                        {t("pages.garden.crops.daysToHarvest")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Environmental Data */}
                <Separator />
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span>🌡️</span>
                    <span>{crop.temperature}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💧</span>
                    <span>{crop.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💦</span>
                    <span className={getIrrigationColor(crop.irrigationNeeds)}>
                      {t(
                        `pages.garden.crops.irrigation.${crop.irrigationNeeds}`
                      )}
                    </span>
                  </div>
                </div>

                {/* Alerts */}
                {(crop.pests.length > 0 || crop.diseases.length > 0) && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      {crop.pests.length > 0 && (
                        <div className="flex items-center gap-2 text-xs bg-yellow-50 border border-yellow-200 rounded p-2">
                          <span>🐛</span>
                          <span className="text-yellow-800">
                            {t("pages.garden.crops.pestsDetected")}
                          </span>
                        </div>
                      )}
                      {crop.diseases.length > 0 && (
                        <div className="flex items-center gap-2 text-xs bg-red-50 border border-red-200 rounded p-2">
                          <span>🦠</span>
                          <span className="text-red-800">
                            {t("pages.garden.crops.diseasesDetected")}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs sm:text-sm"
                  >
                    <span className="sm:hidden">👁️</span>
                    <span className="hidden sm:inline">
                      👁️ {t("pages.garden.crops.viewDetails")}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    ⚙️
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              🤖 {t("pages.garden.crops.aiRecommendations.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✅</span>
                  <div>
                    <p className="font-medium text-green-800 text-sm">
                      {t("pages.garden.crops.aiRecommendations.harvest")}
                    </p>
                    <p className="text-green-700 text-xs">
                      {t("pages.garden.crops.aiRecommendations.harvestDesc")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">💧</span>
                  <div>
                    <p className="font-medium text-blue-800 text-sm">
                      {t("pages.garden.crops.aiRecommendations.irrigation")}
                    </p>
                    <p className="text-blue-700 text-xs">
                      {t("pages.garden.crops.aiRecommendations.irrigationDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Crop Dialog */}
      <CreateCropDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateCrop={handleCreateCrop}
      />
    </PageTemplate>
  );
};

export default CropsPage;
