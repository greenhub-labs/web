import React from "react";
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";
import { Check, X, Pause, AlertTriangle, Clock } from "lucide-react";

export type ScheduleStatus =
  | "active"
  | "inactive"
  | "paused"
  | "completed"
  | "error";

interface ScheduleStatusBadgeProps {
  status: ScheduleStatus;
  statusText: string;
  className?: string;
}

export const ScheduleStatusBadge: React.FC<ScheduleStatusBadgeProps> = ({
  status,
  statusText,
  className = "",
}) => {
  const getStatusConfig = (status: ScheduleStatus) => {
    switch (status) {
      case "active":
        return {
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-200",
          icon: <Check className="h-3 w-3 mr-1" />,
        };
      case "inactive":
        return {
          variant: "outline" as const,
          className: "bg-gray-100 text-gray-600 border-gray-200",
          icon: <X className="h-3 w-3 mr-1" />,
        };
      case "paused":
        return {
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Pause className="h-3 w-3 mr-1" />,
        };
      case "completed":
        return {
          variant: "secondary" as const,
          className: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Clock className="h-3 w-3 mr-1" />,
        };
      case "error":
        return {
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertTriangle className="h-3 w-3 mr-1" />,
        };
      default:
        return {
          variant: "outline" as const,
          className: "",
          icon: null,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} ${className} flex items-center text-xs`}
    >
      {config.icon}
      {statusText}
    </Badge>
  );
};

export type { ScheduleStatusBadgeProps };
