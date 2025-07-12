'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';

// UI Components
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/contexts/shared/presentation/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/contexts/shared/presentation/components/ui/alert-dialog';

// Atomic Design Components
import { StatCard } from '@/contexts/shared/presentation/components/atoms/StatCard';
import { SearchInput } from '@/contexts/shared/presentation/components/atoms/SearchInput';
import {
  ScheduleStatus,
  ScheduleType,
  Frequency,
  Priority,
} from '@/contexts/shared/presentation/components/atoms';
import {
  ScheduleCard,
  Schedule,
} from '@/contexts/shared/presentation/components/molecules/ScheduleCard';
import { CreateScheduleDialog } from '@/contexts/shared/presentation/components/organisms/CreateScheduleDialog';

// Icons
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  Play,
  FileDown,
  FileUp,
  MoreVertical,
  Grid3X3,
  List,
} from 'lucide-react';

const SchedulesPage: React.FC = () => {
  const t = useTranslations();

  // State
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      name: 'Morning Garden Irrigation',
      description: 'Daily morning watering for vegetable garden',
      type: 'irrigation',
      frequency: 'daily',
      status: 'active',
      priority: 'high',
      startTime: '06:00',

      targetSystems: ['Garden Plot A', 'Garden Plot B'],
      conditions: {
        weatherDependent: true,
        skipIfRaining: true,
      },
      nextExecution: '2024-01-16T06:00:00Z',
      lastExecution: '2024-01-15T06:00:00Z',
      executionCount: 15,
      successRate: 100,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T06:00:00Z',
    },
    {
      id: '2',
      name: 'Greenhouse Climate Control',
      description:
        'Temperature and humidity regulation for optimal growing conditions',
      type: 'climate',
      status: 'active',
      frequency: 'custom',
      priority: 'medium',
      startTime: '08:00',
      endTime: '18:00',
      nextExecution: '2024-01-16T08:00:00Z',
      lastExecution: '2024-01-15T18:00:00Z',
      targetSystems: ['climate_greenhouse'],
      executionCount: 120,
      successRate: 95,
      isEnabled: true,
    },
    {
      id: '3',
      name: 'Chicken Coop Door Automation',
      description: 'Automatic door opening at sunrise and closing at sunset',
      type: 'doors',
      status: 'active',
      frequency: 'daily',
      priority: 'high',
      startTime: '07:00',
      nextExecution: '2024-01-16T07:00:00Z',
      lastExecution: '2024-01-15T19:30:00Z',
      targetSystems: ['doors_coop'],
      executionCount: 89,
      successRate: 100,
      isEnabled: true,
    },
    {
      id: '4',
      name: 'Evening Pathway Lighting',
      description: 'Automatic lighting for garden pathways during dark hours',
      type: 'lighting',
      status: 'paused',
      frequency: 'daily',
      priority: 'low',
      startTime: '19:00',
      endTime: '23:00',
      targetSystems: ['lighting_outdoor'],
      executionCount: 32,
      successRate: 92,
      isEnabled: false,
    },
    {
      id: '5',
      name: 'Weekly Chicken Feeding',
      description: 'Automated chicken feeding schedule with portion control',
      type: 'feeding',
      status: 'error',
      frequency: 'weekly',
      priority: 'medium',
      startTime: '09:00',
      targetSystems: ['feeding_chickens'],
      executionCount: 12,
      successRate: 75,
      isEnabled: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus | 'all'>(
    'all',
  );
  const [typeFilter, setTypeFilter] = useState<ScheduleType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Calculate stats
  const totalSchedules = schedules.length;
  const activeSchedules = schedules.filter((s) => s.status === 'active').length;
  const executionsToday = schedules.reduce(
    (sum, s) => sum + (s.executionCount || 0),
    0,
  );
  const nextExecution = schedules
    .filter((s) => s.nextExecution)
    .sort(
      (a, b) =>
        new Date(a.nextExecution!).getTime() -
        new Date(b.nextExecution!).getTime(),
    )[0]?.nextExecution;

  const formatNextExecution = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 1) return '< 1h';
    if (diffHours < 24) return `${diffHours}h`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  // Filter schedules
  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || schedule.status === statusFilter;
    const matchesType = typeFilter === 'all' || schedule.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Handlers
  const handleCreateSchedule = async (scheduleData: Partial<Schedule>) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      name: scheduleData.name!,
      description: scheduleData.description!,
      type: scheduleData.type!,
      status: scheduleData.isEnabled ? 'active' : 'inactive',
      frequency: scheduleData.frequency!,
      priority: scheduleData.priority!,
      startTime: scheduleData.startTime!,
      endTime: scheduleData.endTime,
      nextExecution: scheduleData.isEnabled
        ? new Date(Date.now() + 86400000).toISOString()
        : undefined,
      targetSystems: scheduleData.targetSystems!,
      executionCount: 0,
      successRate: 100,
      isEnabled: scheduleData.isEnabled!,
    };

    setSchedules((prev) => [...prev, newSchedule]);
    setIsLoading(false);
    setCreateDialogOpen(false);
  };

  const handleEditSchedule = async (scheduleData: Partial<Schedule>) => {
    if (!editingSchedule) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === editingSchedule.id
          ? {
              ...schedule,
              ...scheduleData,
              status: scheduleData.isEnabled ? 'active' : 'inactive',
            }
          : schedule,
      ),
    );

    setIsLoading(false);
    setEditingSchedule(null);
  };

  const handleDeleteSchedule = () => {
    if (!scheduleToDelete) return;

    setSchedules((prev) => prev.filter((s) => s.id !== scheduleToDelete.id));
    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
  };

  const handleDuplicateSchedule = (schedule: Schedule) => {
    const duplicatedSchedule: Schedule = {
      ...schedule,
      id: Date.now().toString(),
      name: `${schedule.name} (Copy)`,
      status: 'inactive',
      isEnabled: false,
      executionCount: 0,
      nextExecution: undefined,
      lastExecution: undefined,
    };

    setSchedules((prev) => [...prev, duplicatedSchedule]);
  };

  const handleToggleStatus = (schedule: Schedule) => {
    const newStatus: ScheduleStatus =
      schedule.status === 'active' ? 'paused' : 'active';
    const newEnabled = newStatus === 'active';

    setSchedules((prev) =>
      prev.map((s) =>
        s.id === schedule.id
          ? {
              ...s,
              status: newStatus,
              isEnabled: newEnabled,
              nextExecution: newEnabled
                ? new Date(Date.now() + 86400000).toISOString()
                : undefined,
            }
          : s,
      ),
    );
  };

  const handleRunNow = (schedule: Schedule) => {
    // Simulate running the schedule
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === schedule.id
          ? {
              ...s,
              lastExecution: new Date().toISOString(),
              executionCount: s.executionCount + 1,
            }
          : s,
      ),
    );
  };

  const handleViewHistory = (schedule: Schedule) => {
    // TODO: Implement history view
    console.log('View history for:', schedule.name);
  };

  const getStatusText = (status: ScheduleStatus) => {
    switch (status) {
      case 'active':
        return t('pages.automation.schedules.status.active');
      case 'inactive':
        return t('pages.automation.schedules.status.inactive');
      case 'paused':
        return t('pages.automation.schedules.status.paused');
      case 'completed':
        return t('pages.automation.schedules.status.completed');
      case 'error':
        return t('pages.automation.schedules.status.error');
      default:
        return status;
    }
  };

  const getFrequencyText = (frequency: Frequency) => {
    switch (frequency) {
      case 'once':
        return t('pages.automation.schedules.frequency.once');
      case 'daily':
        return t('pages.automation.schedules.frequency.daily');
      case 'weekly':
        return t('pages.automation.schedules.frequency.weekly');
      case 'monthly':
        return t('pages.automation.schedules.frequency.monthly');
      case 'custom':
        return t('pages.automation.schedules.frequency.custom');
      default:
        return frequency;
    }
  };

  const getPriorityText = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return t('pages.automation.schedules.priority.high');
      case 'medium':
        return t('pages.automation.schedules.priority.medium');
      case 'low':
        return t('pages.automation.schedules.priority.low');
      default:
        return priority;
    }
  };

  const getTypeText = (type: ScheduleType) => {
    switch (type) {
      case 'irrigation':
        return t('pages.automation.schedules.scheduleTypes.irrigation');
      case 'lighting':
        return t('pages.automation.schedules.scheduleTypes.lighting');
      case 'climate':
        return t('pages.automation.schedules.scheduleTypes.climate');
      case 'feeding':
        return t('pages.automation.schedules.scheduleTypes.feeding');
      case 'doors':
        return t('pages.automation.schedules.scheduleTypes.doors');
      case 'custom':
        return t('pages.automation.schedules.scheduleTypes.custom');
      default:
        return type;
    }
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), href: '/' },
    { label: t('navigation.automation.title'), href: '#' },
    {
      label: t('navigation.automation.schedules'),
      href: '/automation/schedules',
    },
  ];

  return (
    <PageTemplate
      pageTitle={t('pages.automation.schedules.title')}
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-6 px-1 sm:px-0">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title={t('pages.automation.schedules.stats.totalSchedules')}
            value={totalSchedules.toString()}
            icon="📋"
          />
          <StatCard
            title={t('pages.automation.schedules.stats.activeSchedules')}
            value={activeSchedules.toString()}
            icon="⚡"
          />
          <StatCard
            title={t('pages.automation.schedules.stats.executionsToday')}
            value={executionsToday.toString()}
            icon="🎯"
          />
          <StatCard
            title={t('pages.automation.schedules.stats.nextExecution')}
            value={formatNextExecution(nextExecution)}
            icon="⏰"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full sm:w-auto">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('common.search')}
              className="w-full sm:w-64"
            />

            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as ScheduleStatus | 'all')
                }
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="active">
                    {t('pages.automation.schedules.status.active')}
                  </SelectItem>
                  <SelectItem value="inactive">
                    {t('pages.automation.schedules.status.inactive')}
                  </SelectItem>
                  <SelectItem value="paused">
                    {t('pages.automation.schedules.status.paused')}
                  </SelectItem>
                  <SelectItem value="error">
                    {t('pages.automation.schedules.status.error')}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(value) =>
                  setTypeFilter(value as ScheduleType | 'all')
                }
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="irrigation">
                    {t('pages.automation.schedules.scheduleTypes.irrigation')}
                  </SelectItem>
                  <SelectItem value="lighting">
                    {t('pages.automation.schedules.scheduleTypes.lighting')}
                  </SelectItem>
                  <SelectItem value="climate">
                    {t('pages.automation.schedules.scheduleTypes.climate')}
                  </SelectItem>
                  <SelectItem value="feeding">
                    {t('pages.automation.schedules.scheduleTypes.feeding')}
                  </SelectItem>
                  <SelectItem value="doors">
                    {t('pages.automation.schedules.scheduleTypes.doors')}
                  </SelectItem>
                  <SelectItem value="custom">
                    {t('pages.automation.schedules.scheduleTypes.custom')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="flex border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={() => setCreateDialogOpen(true)}
              className="flex-1 sm:flex-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {t('pages.automation.schedules.actions.create')}
              </span>
              <span className="sm:hidden">Create</span>
            </Button>
          </div>
        </div>

        {/* Schedules Grid/List */}
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              {searchQuery
                ? t('pages.automation.schedules.emptyStates.noResults')
                : t('pages.automation.schedules.emptyStates.noSchedules')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? t(
                    'pages.automation.schedules.emptyStates.noResultsDescription',
                  )
                : t(
                    'pages.automation.schedules.emptyStates.noSchedulesDescription',
                  )}
            </p>
            {!searchQuery && (
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t(
                  'pages.automation.schedules.emptyStates.createFirstSchedule',
                )}
              </Button>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-4'
            }
          >
            {filteredSchedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                schedule={schedule}
                statusText={getStatusText(schedule.status)}
                frequencyText={getFrequencyText(schedule.frequency)}
                priorityText={getPriorityText(schedule.priority)}
                onEdit={(schedule) => setEditingSchedule(schedule)}
                onDelete={(schedule) => {
                  setScheduleToDelete(schedule);
                  setDeleteDialogOpen(true);
                }}
                onDuplicate={handleDuplicateSchedule}
                onToggleStatus={handleToggleStatus}
                onRunNow={handleRunNow}
                onViewHistory={handleViewHistory}
                className={viewMode === 'list' ? 'max-w-none' : ''}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <CreateScheduleDialog
        open={createDialogOpen || editingSchedule !== null}
        onOpenChange={(open) => {
          if (!open) {
            setCreateDialogOpen(false);
            setEditingSchedule(null);
          }
        }}
        schedule={editingSchedule}
        onSubmit={editingSchedule ? handleEditSchedule : handleCreateSchedule}
        isLoading={isLoading}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Schedule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{scheduleToDelete?.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSchedule}>
              {tCommon.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageTemplate>
  );
};

export default SchedulesPage;
