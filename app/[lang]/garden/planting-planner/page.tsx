"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/presentation/components/ui/card";
import { Separator } from "@/contexts/shared/presentation/components/ui/separator";

// Reusable components
import {
  StatCard,
  ProgressBar,
} from "@/contexts/shared/presentation/components/atoms";
import {
  EntityCardHeader,
  EntityCardActions,
  AlertsSection,
  type CardAction,
} from "@/contexts/shared/presentation/components/molecules";

const PlantingPlannerPage = () => {
  const t = useTranslations();
  const [seasonFilter, setSeasonFilter] = useState<
    "all" | "spring" | "summer" | "autumn" | "winter"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");

  // Mock data for planting recommendations
  const plantingRecommendations = [
    {
      id: "plant-1",
      name: "Tomates",
      variety: "Cherry",
      icon: "🍅",
      season: "spring",
      plantingWindow: "Marzo - Abril",
      harvestWindow: "Junio - Septiembre",
      difficulty: "medium",
      daysToMaturity: 65,
      spacing: "60cm",
      sunRequirement: "full",
      waterRequirement: "medium",
      companionPlants: ["Albahaca", "Perejil"],
      avoidPlants: ["Hinojo"],
      plotSuitability: ["plot-a", "plot-b"],
      notes: "Ideal para principiantes. Requiere tutores altos.",
      isPlanted: false,
      priority: "high",
    },
    {
      id: "plant-2",
      name: "Lechugas",
      variety: "Batavia",
      icon: "🥬",
      season: "spring",
      plantingWindow: "Febrero - Mayo",
      harvestWindow: "Abril - Julio",
      difficulty: "easy",
      daysToMaturity: 45,
      spacing: "25cm",
      sunRequirement: "partial",
      waterRequirement: "high",
      companionPlants: ["Zanahorias", "Rábanos"],
      avoidPlants: ["Apio"],
      plotSuitability: ["plot-a", "plot-b", "plot-c"],
      notes: "Crecimiento rápido. Ideal para sucesión de cultivos.",
      isPlanted: true,
      priority: "medium",
    },
    {
      id: "plant-3",
      name: "Calabacines",
      variety: "Verde oscuro",
      icon: "🥒",
      season: "summer",
      plantingWindow: "Abril - Junio",
      harvestWindow: "Julio - Octubre",
      difficulty: "easy",
      daysToMaturity: 50,
      spacing: "100cm",
      sunRequirement: "full",
      waterRequirement: "high",
      companionPlants: ["Maíz", "Judías"],
      avoidPlants: ["Patatas"],
      plotSuitability: ["plot-c", "plot-d"],
      notes: "Muy productivo. Necesita mucho espacio.",
      isPlanted: false,
      priority: "medium",
    },
    {
      id: "plant-4",
      name: "Espinacas",
      variety: "Baby Leaf",
      icon: "🥬",
      season: "autumn",
      plantingWindow: "Agosto - Octubre",
      harvestWindow: "Octubre - Diciembre",
      difficulty: "easy",
      daysToMaturity: 30,
      spacing: "15cm",
      sunRequirement: "partial",
      waterRequirement: "medium",
      companionPlants: ["Fresas", "Rábanos"],
      avoidPlants: [],
      plotSuitability: ["plot-a", "plot-b"],
      notes: "Resistente al frío. Perfecto para otoño-invierno.",
      isPlanted: false,
      priority: "high",
    },
    {
      id: "plant-5",
      name: "Ajos",
      variety: "Morado",
      icon: "🧄",
      season: "winter",
      plantingWindow: "Octubre - Diciembre",
      harvestWindow: "Junio - Julio",
      difficulty: "easy",
      daysToMaturity: 240,
      spacing: "10cm",
      sunRequirement: "full",
      waterRequirement: "low",
      companionPlants: ["Tomates", "Rosas"],
      avoidPlants: ["Judías"],
      plotSuitability: ["plot-a", "plot-b", "plot-c"],
      notes: "Plantación de invierno para cosecha de verano.",
      isPlanted: false,
      priority: "low",
    },
  ];

  // Seasonal calendar data
  const seasonalCalendar = {
    spring: {
      icon: "🌸",
      name: "Primavera",
      months: ["Marzo", "Abril", "Mayo"],
      tasks: [
        "Preparar semilleros en interior",
        "Plantar tomates y pimientos",
        "Sembrar lechugas y espinacas",
        "Comenzar compost",
      ],
    },
    summer: {
      icon: "☀️",
      name: "Verano",
      months: ["Junio", "Julio", "Agosto"],
      tasks: [
        "Riego frecuente",
        "Cosechar cultivos de primavera",
        "Plantar cultivos de otoño",
        "Control de plagas",
      ],
    },
    autumn: {
      icon: "🍂",
      name: "Otoño",
      months: ["Septiembre", "Octubre", "Noviembre"],
      tasks: [
        "Plantar cultivos de invierno",
        "Preparar el jardín para el frío",
        "Cosechar y almacenar",
        "Compost con hojas caídas",
      ],
    },
    winter: {
      icon: "❄️",
      name: "Invierno",
      months: ["Diciembre", "Enero", "Febrero"],
      tasks: [
        "Planificar la próxima temporada",
        "Mantener cultivos en invernadero",
        "Preparar herramientas",
        "Ordenar semillas",
      ],
    },
  };

  // Filter recommendations by season
  const filteredRecommendations = plantingRecommendations.filter((plant) => {
    if (seasonFilter === "all") return true;
    return plant.season === seasonFilter;
  });

  // Calculate stats
  const totalRecommendations = plantingRecommendations.length;
  const plantedCount = plantingRecommendations.filter(
    (p) => p.isPlanted
  ).length;
  const highPriorityCount = plantingRecommendations.filter(
    (p) => p.priority === "high"
  ).length;
  const currentSeason = "spring"; // This would be calculated based on current date

  // Helper functions
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getSunIcon = (requirement: string) => {
    switch (requirement) {
      case "full":
        return "☀️";
      case "partial":
        return "⛅";
      case "shade":
        return "☁️";
      default:
        return "🌤️";
    }
  };

  const breadcrumbItems = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.garden.title"), href: "#" },
    {
      label: t("navigation.garden.plantingPlanner"),
      href: "/garden/planting-planner",
    },
  ];

  return (
    <PageTemplate
      pageTitle={t("pages.garden.plantingPlanner.title")}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          {/* Desktop: All controls */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3 py-2 text-sm"
              >
                🔲 {t("pages.garden.plantingPlanner.gridView")}
              </Button>
              <Button
                variant={viewMode === "timeline" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="px-3 py-2 text-sm"
              >
                📅 {t("pages.garden.plantingPlanner.timelineView")}
              </Button>
            </div>
            <div className="flex items-center gap-0.5 bg-background border rounded-md p-1">
              <Button
                variant={seasonFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSeasonFilter("all")}
                className="px-3 py-2 text-sm"
              >
                🌍 {t("pages.garden.plantingPlanner.filterAll")}
              </Button>
              <Button
                variant={seasonFilter === "spring" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSeasonFilter("spring")}
                className="px-3 py-2 text-sm"
              >
                🌸 {t("pages.garden.plantingPlanner.spring")}
              </Button>
              <Button
                variant={seasonFilter === "summer" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSeasonFilter("summer")}
                className="px-3 py-2 text-sm"
              >
                ☀️ {t("pages.garden.plantingPlanner.summer")}
              </Button>
              <Button
                variant={seasonFilter === "autumn" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSeasonFilter("autumn")}
                className="px-3 py-2 text-sm"
              >
                🍂 {t("pages.garden.plantingPlanner.autumn")}
              </Button>
              <Button
                variant={seasonFilter === "winter" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSeasonFilter("winter")}
                className="px-3 py-2 text-sm"
              >
                ❄️ {t("pages.garden.plantingPlanner.winter")}
              </Button>
            </div>
          </div>

          {/* Mobile: View toggle only */}
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
                variant={viewMode === "timeline" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="h-8 w-8 p-0"
              >
                📅
              </Button>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4 sm:space-y-6">
        {/* Mobile Filters */}
        <div className="md:hidden">
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="space-y-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {t("pages.garden.plantingPlanner.filterBySeason")}:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={seasonFilter === "all" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSeasonFilter("all")}
                    className="h-9 text-xs px-3 justify-start"
                  >
                    🌍 {t("pages.garden.plantingPlanner.all")}
                  </Button>
                  <Button
                    variant={seasonFilter === "spring" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSeasonFilter("spring")}
                    className="h-9 text-xs px-3 justify-start"
                  >
                    🌸 {t("pages.garden.plantingPlanner.spring")}
                  </Button>
                  <Button
                    variant={seasonFilter === "summer" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSeasonFilter("summer")}
                    className="h-9 text-xs px-3 justify-start"
                  >
                    ☀️ {t("pages.garden.plantingPlanner.summer")}
                  </Button>
                  <Button
                    variant={seasonFilter === "autumn" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSeasonFilter("autumn")}
                    className="h-9 text-xs px-3 justify-start"
                  >
                    🍂 {t("pages.garden.plantingPlanner.autumn")}
                  </Button>
                  <Button
                    variant={seasonFilter === "winter" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSeasonFilter("winter")}
                    className="h-9 text-xs px-3 justify-start col-span-2"
                  >
                    ❄️ {t("pages.garden.plantingPlanner.winter")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t("pages.garden.plantingPlanner.stats.totalRecommendations")}
            value={totalRecommendations}
            icon="🌱"
          />

          <StatCard
            title={t("pages.garden.plantingPlanner.stats.alreadyPlanted")}
            value={plantedCount}
            icon="✅"
          />

          <StatCard
            title={t("pages.garden.plantingPlanner.stats.highPriority")}
            value={highPriorityCount}
            icon="⭐"
          />

          <StatCard
            title={t("pages.garden.plantingPlanner.stats.currentSeason")}
            value={t(`pages.garden.plantingPlanner.${currentSeason}`)}
            icon={
              seasonalCalendar[currentSeason as keyof typeof seasonalCalendar]
                .icon
            }
          />
        </div>

        {/* Current Season Overview */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              {
                seasonalCalendar[currentSeason as keyof typeof seasonalCalendar]
                  .icon
              }{" "}
              {t("pages.garden.plantingPlanner.currentSeasonTasks")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                  📅 {t("pages.garden.plantingPlanner.thisMonth")}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {seasonalCalendar[
                    currentSeason as keyof typeof seasonalCalendar
                  ].tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0"></span>
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2 text-sm sm:text-base">
                  🌡️ {t("pages.garden.plantingPlanner.seasonalTips")}
                </h3>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs sm:text-sm">
                    <span className="font-medium text-green-800">
                      💡 {t("pages.garden.plantingPlanner.tip")}:
                    </span>
                    <span className="text-green-700 ml-1 leading-relaxed">
                      {t("pages.garden.plantingPlanner.springTip")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planting Recommendations */}
        <div
          className={
            viewMode === "grid"
              ? "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              : "space-y-3 sm:space-y-4"
          }
        >
          {filteredRecommendations.map((plant) => {
            const plantActions: CardAction[] = [
              {
                label: plant.isPlanted
                  ? t("pages.garden.plantingPlanner.viewDetails")
                  : t("pages.garden.plantingPlanner.addToPlots"),
                icon: plant.isPlanted ? "👁️" : "➕",
                onClick: () =>
                  console.log(
                    plant.isPlanted ? "View details" : "Add to plots",
                    plant.id
                  ),
                variant: plant.isPlanted ? "outline" : "default",
                isPrimary: true,
              },
              {
                label: t("pages.garden.plantingPlanner.learnMore"),
                icon: "📚",
                onClick: () => console.log("Learn more about", plant.id),
                variant: "outline",
              },
            ];

            const alerts = [
              ...(plant.priority === "high"
                ? [
                    {
                      type: "info" as const,
                      icon: "⭐",
                      message: t("pages.garden.plantingPlanner.highPriority"),
                    },
                  ]
                : []),
              ...(plant.avoidPlants.length > 0
                ? [
                    {
                      type: "warning" as const,
                      icon: "⚠️",
                      message: `${t(
                        "pages.garden.plantingPlanner.avoid"
                      )}: ${plant.avoidPlants.join(", ")}`,
                    },
                  ]
                : []),
            ];

            return (
              <Card
                key={plant.id}
                className={`hover:shadow-md transition-shadow border ${
                  plant.isPlanted
                    ? "bg-green-50/50 border-green-200"
                    : "border-border"
                }`}
              >
                <EntityCardHeader
                  icon={plant.icon}
                  title={plant.name}
                  subtitle={`${plant.variety} • ${t(
                    `pages.garden.plantingPlanner.seasons.${plant.season}`
                  )}`}
                  status={plant.isPlanted ? "planted" : plant.priority}
                  statusType="planting"
                  statusLabel={
                    plant.isPlanted
                      ? t("pages.garden.plantingPlanner.status.planted")
                      : t(
                          `pages.garden.plantingPlanner.priority.${plant.priority}`
                        )
                  }
                />

                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                  {/* Planting & Harvest Windows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-medium">
                        {t("pages.garden.plantingPlanner.plantingWindow")}
                      </p>
                      <p className="font-semibold text-foreground">
                        {plant.plantingWindow}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-medium">
                        {t("pages.garden.plantingPlanner.harvestWindow")}
                      </p>
                      <p className="font-semibold text-foreground">
                        {plant.harvestWindow}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Growing Requirements */}
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      {t("pages.garden.plantingPlanner.requirements")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="flex items-center gap-2 p-2 bg-accent/50 rounded">
                        {getSunIcon(plant.sunRequirement)}
                        <span className="font-medium">
                          {t(
                            `pages.garden.plantingPlanner.sun.${plant.sunRequirement}`
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-accent/50 rounded">
                        <span>💧</span>
                        <span
                          className={`font-medium ${getDifficultyColor(
                            plant.waterRequirement
                          )}`}
                        >
                          {t(
                            `pages.garden.plantingPlanner.water.${plant.waterRequirement}`
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-accent/50 rounded">
                        <span>📏</span>
                        <span className="font-medium">{plant.spacing}</span>
                      </div>
                    </div>
                  </div>

                  {/* Maturity Progress (if planted) */}
                  {plant.isPlanted && (
                    <>
                      <Separator />
                      <ProgressBar
                        label={t("pages.garden.plantingPlanner.maturity")}
                        value={75} // This would be calculated based on planting date
                        maxValue={100}
                        unit="%"
                      />
                    </>
                  )}

                  <Separator />

                  {/* Companion Plants */}
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      {t("pages.garden.plantingPlanner.companionPlants")}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {plant.companionPlants.map((companion, index) => (
                        <span
                          key={index}
                          className="px-2 py-1.5 bg-green-100 text-green-700 rounded-md text-xs font-medium"
                        >
                          {companion}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty & Info */}
                  <Separator />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 p-2 bg-accent/50 rounded">
                      <span>⚡</span>
                      <span
                        className={`font-medium ${getDifficultyColor(
                          plant.difficulty
                        )}`}
                      >
                        {t(
                          `pages.garden.plantingPlanner.difficulty.${plant.difficulty}`
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-accent/50 rounded">
                      <span>⏱️</span>
                      <span className="font-medium">
                        {plant.daysToMaturity}{" "}
                        {t("pages.garden.plantingPlanner.days")}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      💡 {plant.notes}
                    </p>
                  </div>

                  {/* Alerts */}
                  <Separator />
                  <AlertsSection alerts={alerts} />

                  {/* Actions */}
                  <EntityCardActions actions={plantActions} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Planting Assistant */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              🤖 {t("pages.garden.plantingPlanner.aiAssistant.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
              <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 mt-0.5 text-lg">🌱</span>
                  <div className="space-y-1">
                    <p className="font-medium text-blue-800 text-sm sm:text-base">
                      {t("pages.garden.plantingPlanner.aiAssistant.suggestion")}
                    </p>
                    <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                      {t(
                        "pages.garden.plantingPlanner.aiAssistant.suggestionDesc"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-orange-600 mt-0.5 text-lg">📅</span>
                  <div className="space-y-1">
                    <p className="font-medium text-orange-800 text-sm sm:text-base">
                      {t("pages.garden.plantingPlanner.aiAssistant.timing")}
                    </p>
                    <p className="text-orange-700 text-xs sm:text-sm leading-relaxed">
                      {t("pages.garden.plantingPlanner.aiAssistant.timingDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default PlantingPlannerPage;
