import React from "react";
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";
import { ChevronUp, Minus, ChevronDown } from "lucide-react";

export type Priority = "high" | "medium" | "low";

interface PriorityIndicatorProps {
  priority: Priority;
  priorityText: string;
  className?: string;
  showIcon?: boolean;
}

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  priorityText,
  className = "",
  showIcon = true,
}) => {
  const getPriorityConfig = (priority: Priority) => {
    switch (priority) {
      case "high":
        return {
          className: "bg-red-100 text-red-800 border-red-200",
          icon: <ChevronUp className="h-3 w-3 mr-1" />,
        };
      case "medium":
        return {
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Minus className="h-3 w-3 mr-1" />,
        };
      case "low":
        return {
          className: "bg-green-100 text-green-800 border-green-200",
          icon: <ChevronDown className="h-3 w-3 mr-1" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-600 border-gray-200",
          icon: <Minus className="h-3 w-3 mr-1" />,
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge variant="outline" className={`${config.className} ${className}`}>
      {showIcon && config.icon}
      {priorityText}
    </Badge>
  );
};
