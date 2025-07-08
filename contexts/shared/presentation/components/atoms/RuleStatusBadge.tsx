import React from "react";
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";
import { Check, X, Pause, AlertTriangle } from "lucide-react";

export type RuleStatus = "active" | "inactive" | "error" | "paused";

interface RuleStatusBadgeProps {
  status: RuleStatus;
  statusText: string;
  className?: string;
}

export const RuleStatusBadge: React.FC<RuleStatusBadgeProps> = ({
  status,
  statusText,
  className = "",
}) => {
  const getStatusConfig = (status: RuleStatus) => {
    switch (status) {
      case "active":
        return {
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-200",
          icon: <Check className="h-3 w-3 mr-1" />,
        };
      case "paused":
        return {
          variant: "secondary" as const,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Pause className="h-3 w-3 mr-1" />,
        };
      case "error":
        return {
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-200",
          icon: <X className="h-3 w-3 mr-1" />,
        };
      default: // inactive
        return {
          variant: "outline" as const,
          className: "bg-gray-100 text-gray-600 border-gray-200",
          icon: <AlertTriangle className="h-3 w-3 mr-1" />,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} ${className}`}
    >
      {config.icon}
      {statusText}
    </Badge>
  );
};
