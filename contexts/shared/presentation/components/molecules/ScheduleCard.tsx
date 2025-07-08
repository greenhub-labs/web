import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/contexts/shared/presentation/components/ui/card";
import { Button } from "@/contexts/shared/presentation/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/contexts/shared/presentation/components/ui/dropdown-menu";
import {
  ScheduleStatusBadge,
  ScheduleTypeIcon,
  PriorityIndicator,
  FrequencyIndicator,
} from "@/contexts/shared/presentation/components/atoms";
import type {
  ScheduleStatus,
  ScheduleType,
  Priority,
  Frequency,
} from "@/contexts/shared/presentation/components/atoms";
import {
  MoreVertical,
  Play,
  Pause,
  Edit,
  Trash2,
  Copy,
  Clock,
  MapPin,
  Activity,
  Calendar,
  Target,
} from "lucide-react";

export interface Schedule {
  id: string;
  name: string;
  description: string;
  type: ScheduleType;
  status: ScheduleStatus;
  frequency: Frequency;
  priority: Priority;
  startTime: string;
  endTime?: string;
  nextExecution?: string;
  lastExecution?: string;
  targetSystems: string[];
  executionCount: number;
  successRate: number;
  isEnabled: boolean;
}

export interface ScheduleCardProps {
  schedule: Schedule;
  statusText: string;
  frequencyText: string;
  priorityText: string;
  onEdit?: (schedule: Schedule) => void;
  onDelete?: (schedule: Schedule) => void;
  onDuplicate?: (schedule: Schedule) => void;
  onToggleStatus?: (schedule: Schedule) => void;
  onRunNow?: (schedule: Schedule) => void;
  onViewHistory?: (schedule: Schedule) => void;
  className?: string;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  statusText,
  frequencyText,
  priorityText,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  onRunNow,
  onViewHistory,
  className = "",
}) => {
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatNextExecution = (dateString?: string) => {
    if (!dateString) return "Not scheduled";
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 1) return "In less than 1 hour";
    if (diffHours < 24) return `In ${diffHours} hours`;
    return `In ${Math.floor(diffHours / 24)} days`;
  };

  return (
    <Card
      className={`hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <div className="flex-shrink-0 mt-1">
              <ScheduleTypeIcon type={schedule.type} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm truncate">
                  {schedule.name}
                </h3>
                <ScheduleStatusBadge
                  status={schedule.status}
                  statusText={statusText}
                />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {schedule.description}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <FrequencyIndicator
                  frequency={schedule.frequency}
                  frequencyText={frequencyText}
                />
                <PriorityIndicator
                  priority={schedule.priority}
                  priorityText={priorityText}
                />
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {schedule.status === "active" && onRunNow && (
                <DropdownMenuItem onClick={() => onRunNow(schedule)}>
                  <Play className="h-4 w-4 mr-2" />
                  Run Now
                </DropdownMenuItem>
              )}
              {onToggleStatus && (
                <DropdownMenuItem onClick={() => onToggleStatus(schedule)}>
                  {schedule.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </>
                  )}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(schedule)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              )}
              {onDuplicate && (
                <DropdownMenuItem onClick={() => onDuplicate(schedule)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
              )}
              {onViewHistory && (
                <DropdownMenuItem onClick={() => onViewHistory(schedule)}>
                  <Activity className="h-4 w-4 mr-2" />
                  View History
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(schedule)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Time: {formatTime(schedule.startTime)}</span>
              {schedule.endTime && (
                <span> - {formatTime(schedule.endTime)}</span>
              )}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Target className="h-3 w-3 mr-1" />
              <span>Systems: {schedule.targetSystems.length}</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Next: {formatNextExecution(schedule.nextExecution)}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Activity className="h-3 w-3 mr-1" />
              <span>Success: {schedule.successRate}%</span>
            </div>
          </div>
        </div>

        {schedule.targetSystems.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>
                Targets: {schedule.targetSystems.slice(0, 2).join(", ")}
              </span>
              {schedule.targetSystems.length > 2 && (
                <span>+{schedule.targetSystems.length - 2} more</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
