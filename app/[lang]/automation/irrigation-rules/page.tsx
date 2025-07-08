"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTemplate } from "@/contexts/shared/presentation/components/templates/page-template";

// UI Components
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import { Input } from "@/contexts/shared/presentation/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/presentation/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/contexts/shared/presentation/components/ui/alert-dialog";

// Atomic Design Components
import { StatCard } from "@/contexts/shared/presentation/components/atoms/StatCard";
import { SettingsSection } from "@/contexts/shared/presentation/components/molecules/SettingsSection";
import { RuleCard } from "@/contexts/shared/presentation/components/molecules/RuleCard";
import type { IrrigationRule } from "@/contexts/shared/presentation/components/molecules";
import { CreateIrrigationRuleDialog } from "@/contexts/shared/presentation/components/organisms/CreateIrrigationRuleDialog";

// Icons
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  AlertCircle,
} from "lucide-react";

const IrrigationRulesPage: React.FC = () => {
  const t = useTranslations("pages.automation.irrigationRules");
  const tCommon = useTranslations("common");
  const tNavigation = useTranslations("navigation");

  // Mock data for irrigation rules
  const [rules, setRules] = useState<IrrigationRule[]>([
    {
      id: "rule-1",
      name: "Morning Garden Watering",
      description:
        "Automated morning irrigation for main vegetable garden based on soil moisture levels",
      type: "moisture",
      status: "active",
      priority: "high",
      targetPlots: ["plot-1", "plot-2"],
      lastTriggered: "2024-01-15T07:00:00Z",
      nextExecution: "Tomorrow at 7:00 AM",
      triggeredCount: 45,
      waterUsed: 1250,
    },
    {
      id: "rule-2",
      name: "Evening Herb Garden",
      description: "Scheduled evening watering for herb garden every other day",
      type: "schedule",
      status: "active",
      priority: "medium",
      targetPlots: ["plot-3"],
      lastTriggered: "2024-01-14T19:00:00Z",
      nextExecution: "Today at 7:00 PM",
      triggeredCount: 23,
      waterUsed: 680,
    },
    {
      id: "rule-3",
      name: "Rain Detection Override",
      description: "Skip irrigation when rain is detected or forecasted",
      type: "weather",
      status: "active",
      priority: "high",
      targetPlots: ["plot-1", "plot-2", "plot-3"],
      lastTriggered: "2024-01-12T14:30:00Z",
      triggeredCount: 8,
      waterUsed: 0,
    },
    {
      id: "rule-4",
      name: "High Temperature Emergency",
      description:
        "Emergency irrigation when temperature exceeds 35°C during summer",
      type: "temperature",
      status: "paused",
      priority: "high",
      targetPlots: ["plot-1", "plot-2"],
      lastTriggered: "2024-01-10T15:45:00Z",
      triggeredCount: 12,
      waterUsed: 890,
    },
    {
      id: "rule-5",
      name: "Weekend Manual Override",
      description: "Manual control rule for weekend garden maintenance",
      type: "manual",
      status: "inactive",
      priority: "low",
      targetPlots: ["plot-4"],
      triggeredCount: 5,
      waterUsed: 125,
    },
  ]);

  // Mock available plots
  const availablePlots = [
    { id: "plot-1", name: "Vegetable Garden A", location: "North Side" },
    { id: "plot-2", name: "Vegetable Garden B", location: "South Side" },
    { id: "plot-3", name: "Herb Garden", location: "East Corner" },
    { id: "plot-4", name: "Greenhouse Plot", location: "Greenhouse 1" },
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<IrrigationRule | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ruleToDelete, setRuleToDelete] = useState<IrrigationRule | null>(null);

  // Filter rules based on search and filters
  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || rule.status === statusFilter;
    const matchesType = typeFilter === "all" || rule.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const activeRules = rules.filter((rule) => rule.status === "active").length;
  const totalTriggers = rules.reduce(
    (sum, rule) => sum + rule.triggeredCount,
    0
  );
  const totalWaterUsed = rules.reduce((sum, rule) => sum + rule.waterUsed, 0);

  // Event handlers
  const handleCreateRule = async (ruleData: Partial<IrrigationRule>) => {
    const newRule: IrrigationRule = {
      id: `rule-${Date.now()}`,
      name: ruleData.name!,
      description: ruleData.description!,
      type: ruleData.type!,
      status: ruleData.status!,
      priority: ruleData.priority!,
      targetPlots: ruleData.targetPlots!,
      triggeredCount: 0,
      waterUsed: 0,
    };

    setRules((prev) => [...prev, newRule]);
  };

  const handleEditRule = (rule: IrrigationRule) => {
    setEditingRule(rule);
    setCreateDialogOpen(true);
  };

  const handleUpdateRule = async (ruleData: Partial<IrrigationRule>) => {
    if (!editingRule) return;

    setRules((prev) =>
      prev.map((rule) =>
        rule.id === editingRule.id ? { ...rule, ...ruleData } : rule
      )
    );
    setEditingRule(null);
  };

  const handleDeleteRule = (rule: IrrigationRule) => {
    setRuleToDelete(rule);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteRule = () => {
    if (ruleToDelete) {
      setRules((prev) => prev.filter((rule) => rule.id !== ruleToDelete.id));
      setRuleToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleDuplicateRule = (rule: IrrigationRule) => {
    const duplicatedRule: IrrigationRule = {
      ...rule,
      id: `rule-${Date.now()}`,
      name: `${rule.name} (Copy)`,
      status: "inactive",
      triggeredCount: 0,
      waterUsed: 0,
      lastTriggered: undefined,
      nextExecution: undefined,
    };

    setRules((prev) => [...prev, duplicatedRule]);
  };

  const handleToggleStatus = (rule: IrrigationRule) => {
    const newStatus = rule.status === "active" ? "inactive" : "active";
    setRules((prev) =>
      prev.map((r) => (r.id === rule.id ? { ...r, status: newStatus } : r))
    );
  };

  const handleTestRun = (rule: IrrigationRule) => {
    // Simulate test run
    console.log("Test run for rule:", rule.name);
    // In a real app, this would trigger the actual irrigation test
  };

  const breadcrumbItems = [
    {
      label: tNavigation("automation.title"),
      href: "/automation",
    },
  ];

  return (
    <PageTemplate
      pageTitle={tNavigation("automation.irrigationRules")}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("stats.totalRules")}
            value={rules.length.toString()}
            icon="🤖"
          />
          <StatCard
            title={t("stats.activeRules")}
            value={activeRules.toString()}
            icon="✅"
          />
          <StatCard
            title={t("stats.triggersToday")}
            value={totalTriggers.toString()}
            icon="⚡"
          />
          <StatCard
            title={t("stats.waterSaved")}
            value={`${(totalWaterUsed / 1000).toFixed(1)}m³`}
            icon="💧"
          />
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={tCommon("search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">{t("status.active")}</SelectItem>
                  <SelectItem value="inactive">
                    {t("status.inactive")}
                  </SelectItem>
                  <SelectItem value="paused">{t("status.paused")}</SelectItem>
                  <SelectItem value="error">{t("status.error")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="moisture">
                    {t("ruleTypes.moisture")}
                  </SelectItem>
                  <SelectItem value="schedule">
                    {t("ruleTypes.schedule")}
                  </SelectItem>
                  <SelectItem value="weather">
                    {t("ruleTypes.weather")}
                  </SelectItem>
                  <SelectItem value="temperature">
                    {t("ruleTypes.temperature")}
                  </SelectItem>
                  <SelectItem value="manual">
                    {t("ruleTypes.manual")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              {t("actions.importRules")}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {t("actions.exportRules")}
            </Button>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("actions.create")}
            </Button>
          </div>
        </div>

        {/* Rules List */}
        {filteredRules.length > 0 ? (
          <SettingsSection title={t("title")} subtitle={t("subtitle")}>
            <div className="grid gap-4">
              {filteredRules.map((rule) => (
                <RuleCard
                  key={rule.id}
                  rule={rule}
                  statusTexts={{
                    active: t("status.active"),
                    inactive: t("status.inactive"),
                    error: t("status.error"),
                    paused: t("status.paused"),
                  }}
                  priorityTexts={{
                    high: t("priority.high"),
                    medium: t("priority.medium"),
                    low: t("priority.low"),
                  }}
                  actionTexts={{
                    edit: t("actions.edit"),
                    delete: t("actions.delete"),
                    duplicate: t("actions.duplicate"),
                    enable: t("actions.enable"),
                    disable: t("actions.disable"),
                    pause: t("actions.pause"),
                    resume: t("actions.resume"),
                    testRun: t("actions.testRun"),
                  }}
                  onEdit={handleEditRule}
                  onDelete={handleDeleteRule}
                  onDuplicate={handleDuplicateRule}
                  onToggleStatus={handleToggleStatus}
                  onTestRun={handleTestRun}
                />
              ))}
            </div>
          </SettingsSection>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {t("emptyStates.noRules")}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t("emptyStates.noRulesDescription")}
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("emptyStates.createFirstRule")}
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <CreateIrrigationRuleDialog
        open={createDialogOpen}
        onOpenChange={(open) => {
          setCreateDialogOpen(open);
          if (!open) {
            setEditingRule(null);
          }
        }}
        onSubmit={editingRule ? handleUpdateRule : handleCreateRule}
        editingRule={editingRule}
        availablePlots={availablePlots}
        translations={{
          form: {
            title: t("form.title"),
            editTitle: t("form.editTitle"),
            description: t("form.description"),
            name: t("form.name"),
            namePlaceholder: t("form.namePlaceholder"),
            description: t("form.description"),
            descriptionPlaceholder: t("form.descriptionPlaceholder"),
            ruleType: t("form.ruleType"),
            ruleTypePlaceholder: t("form.ruleTypePlaceholder"),
            targetPlots: t("form.targetPlots"),
            targetPlotsPlaceholder: t("form.targetPlotsPlaceholder"),
            priority: t("form.priority"),
            priorityPlaceholder: t("form.priorityPlaceholder"),
            enabled: t("form.enabled"),
            enabledDescription: t("form.enabledDescription"),
            create: t("form.create"),
            update: t("form.update"),
            creating: t("form.creating"),
            updating: t("form.updating"),
            errors: {
              nameRequired: t("form.errors.nameRequired"),
              ruleTypeRequired: t("form.errors.ruleTypeRequired"),
              plotsRequired: t("form.errors.plotsRequired"),
            },
          },
          ruleTypes: {
            moisture: t("ruleTypes.moisture"),
            schedule: t("ruleTypes.schedule"),
            weather: t("ruleTypes.weather"),
            temperature: t("ruleTypes.temperature"),
            manual: t("ruleTypes.manual"),
          },
          priority: {
            high: t("priority.high"),
            medium: t("priority.medium"),
            low: t("priority.low"),
          },
          common: {
            cancel: tCommon("cancel"),
          },
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Irrigation Rule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{ruleToDelete?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              {tCommon("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRule}>
              {t("actions.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageTemplate>
  );
};

export default IrrigationRulesPage;
