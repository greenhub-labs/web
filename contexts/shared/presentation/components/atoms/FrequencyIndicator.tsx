import React from "react";
import { Badge } from "@/contexts/shared/presentation/components/ui/badge";
import {
  Clock,
  Calendar,
  CalendarDays,
  CalendarRange,
  Zap,
} from "lucide-react";

export type Frequency = "once" | "daily" | "weekly" | "monthly" | "custom";

interface FrequencyIndicatorProps {
  frequency: Frequency;
  frequencyText: string;
  className?: string;
  showIcon?: boolean;
}

export const FrequencyIndicator: React.FC<FrequencyIndicatorProps> = ({
  frequency,
  frequencyText,
  className = "",
  showIcon = true,
}) => {
  const getFrequencyConfig = (frequency: Frequency) => {
    switch (frequency) {
      case "once":
        return {
          className: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Clock className="h-3 w-3 mr-1" />,
        };
      case "daily":
        return {
          className: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Calendar className="h-3 w-3 mr-1" />,
        };
      case "weekly":
        return {
          className: "bg-green-100 text-green-800 border-green-200",
          icon: <CalendarDays className="h-3 w-3 mr-1" />,
        };
      case "monthly":
        return {
          className: "bg-purple-100 text-purple-800 border-purple-200",
          icon: <CalendarRange className="h-3 w-3 mr-1" />,
        };
      case "custom":
        return {
          className: "bg-orange-100 text-orange-800 border-orange-200",
          icon: <Zap className="h-3 w-3 mr-1" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <Clock className="h-3 w-3 mr-1" />,
        };
    }
  };

  const config = getFrequencyConfig(frequency);

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${className} flex items-center text-xs`}
    >
      {showIcon && config.icon}
      {frequencyText}
    </Badge>
  );
};

export type { FrequencyIndicatorProps };
