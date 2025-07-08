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
  RuleStatusBadge,
  RuleTypeIcon,
  PriorityIndicator,
} from "@/contexts/shared/presentation/components/atoms";
import type {
  RuleStatus,
  RuleType,
  Priority,
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
} from "lucide-react";

export interface IrrigationRule {
  id: string;
  name: string;
  description: string;
  type: RuleType;
  status: RuleStatus;
  priority: Priority;
  targetPlots: string[];
  lastTriggered?: string;
  nextExecution?: string;
  triggeredCount: number;
  waterUsed: number; // in liters
}

interface RuleCardProps {
  rule: IrrigationRule;
  statusTexts: {
    active: string;
    inactive: string;
    error: string;
    paused: string;
  };
  priorityTexts: {
    high: string;
    medium: string;
    low: string;
  };
  actionTexts: {
    edit: string;
    delete: string;
    duplicate: string;
    enable: string;
    disable: string;
    pause: string;
    resume: string;
    testRun: string;
  };
  onEdit: (rule: IrrigationRule) => void;
  onDelete: (rule: IrrigationRule) => void;
  onDuplicate: (rule: IrrigationRule) => void;
  onToggleStatus: (rule: IrrigationRule) => void;
  onTestRun: (rule: IrrigationRule) => void;
  className?: string;
}

export const RuleCard: React.FC<RuleCardProps> = ({
  rule,
  statusTexts,
  priorityTexts,
  actionTexts,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  onTestRun,
  className = "",
}) => {
  const formatLastTriggered = (dateString?: string) => {
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

  const getToggleAction = () => {
    switch (rule.status) {
      case "active":
        return {
          text: actionTexts.pause,
          icon: <Pause className="h-4 w-4 mr-2" />,
        };
      case "paused":
        return {
          text: actionTexts.resume,
          icon: <Play className="h-4 w-4 mr-2" />,
        };
      case "inactive":
        return {
          text: actionTexts.enable,
          icon: <Play className="h-4 w-4 mr-2" />,
        };
      default:
        return {
          text: actionTexts.enable,
          icon: <Play className="h-4 w-4 mr-2" />,
        };
    }
  };

  const toggleAction = getToggleAction();

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            <RuleTypeIcon type={rule.type} size={24} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm truncate">{rule.name}</h3>
                <RuleStatusBadge
                  status={rule.status}
                  statusText={statusTexts[rule.status]}
                />
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {rule.description}
              </p>
              <div className="flex items-center gap-2">
                <PriorityIndicator
                  priority={rule.priority}
                  priorityText={priorityTexts[rule.priority]}
                  showIcon={false}
                />
                {rule.targetPlots.length > 0 && (
                  <span className="text-xs text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {rule.targetPlots.length} plot
                    {rule.targetPlots.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(rule)}>
                <Edit className="h-4 w-4 mr-2" />
                {actionTexts.edit}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleStatus(rule)}>
                {toggleAction.icon}
                {toggleAction.text}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTestRun(rule)}>
                <Activity className="h-4 w-4 mr-2" />
                {actionTexts.testRun}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(rule)}>
                <Copy className="h-4 w-4 mr-2" />
                {actionTexts.duplicate}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(rule)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {actionTexts.delete}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground mb-1">Last Triggered</p>
            <p className="font-medium flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatLastTriggered(rule.lastTriggered)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Executions</p>
            <p className="font-medium">{rule.triggeredCount}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Water Used</p>
            <p className="font-medium">{rule.waterUsed}L</p>
          </div>
        </div>

        {rule.nextExecution && rule.status === "active" && (
          <div className="mt-3 pt-3 border-t text-xs">
            <p className="text-muted-foreground">
              Next execution:{" "}
              <span className="font-medium text-foreground">
                {rule.nextExecution}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
