import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export interface StatusBadgeProps {
  status: string;
  type: "plot" | "crop" | "irrigation" | "planting";
  label: string;
  className?: string;
  showTextOnMobile?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type,
  label,
  className,
  showTextOnMobile = false,
}) => {
  const getStatusConfig = () => {
    // Plot status configs
    if (type === "plot") {
      switch (status) {
        case "optimal":
          return { color: "bg-green-100 text-green-700", icon: "✅" };
        case "warning":
          return { color: "bg-yellow-100 text-yellow-700", icon: "⚠️" };
        case "maintenance":
          return { color: "bg-blue-100 text-blue-700", icon: "🔧" };
        default:
          return { color: "bg-red-100 text-red-700", icon: "❌" };
      }
    }

    // Crop status configs
    if (type === "crop") {
      switch (status) {
        case "growing":
          return { color: "bg-green-100 text-green-700", icon: "🌱" };
        case "ready":
          return { color: "bg-blue-100 text-blue-700", icon: "✅" };
        case "harvested":
          return { color: "bg-gray-100 text-gray-700", icon: "📦" };
        default:
          return { color: "bg-red-100 text-red-700", icon: "⚠️" };
      }
    }

    // Planting status configs
    if (type === "planting") {
      switch (status) {
        case "planted":
          return { color: "bg-green-100 text-green-700", icon: "✅" };
        case "high":
          return { color: "bg-red-100 text-red-700", icon: "⭐" };
        case "medium":
          return { color: "bg-yellow-100 text-yellow-700", icon: "⚡" };
        case "low":
          return { color: "bg-gray-100 text-gray-700", icon: "🔽" };
        default:
          return { color: "bg-blue-100 text-blue-700", icon: "🌱" };
      }
    }

    // Irrigation status configs
    switch (status) {
      case "active":
        return { color: "bg-green-100 text-green-700", icon: "🌊" };
      case "scheduled":
        return { color: "bg-blue-100 text-blue-700", icon: "⏰" };
      case "manual":
        return { color: "bg-yellow-100 text-yellow-700", icon: "🎛️" };
      default:
        return { color: "bg-red-100 text-red-700", icon: "❌" };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={cn(config.color, "text-xs shrink-0", className)}>
      {config.icon}{" "}
      <span className={showTextOnMobile ? "" : "hidden sm:inline"}>
        {label}
      </span>
    </Badge>
  );
};

export default StatusBadge;
