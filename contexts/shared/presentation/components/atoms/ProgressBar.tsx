import React from "react";
import { cn } from "../../lib/utils";

export interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  unit?: string;
  colorType?: "green" | "blue" | "yellow" | "red" | "auto";
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  maxValue = 100,
  unit = "%",
  colorType = "auto",
  className,
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const getColorClass = () => {
    if (colorType !== "auto") {
      switch (colorType) {
        case "green":
          return "bg-green-500";
        case "blue":
          return "bg-blue-500";
        case "yellow":
          return "bg-yellow-500";
        case "red":
          return "bg-red-500";
        default:
          return "bg-green-500";
      }
    }

    // Auto color based on percentage
    if (percentage >= 60) return "bg-green-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = () => {
    if (colorType !== "auto") {
      switch (colorType) {
        case "green":
          return "text-green-600";
        case "blue":
          return "text-blue-600";
        case "yellow":
          return "text-yellow-600";
        case "red":
          return "text-red-600";
        default:
          return "text-green-600";
      }
    }

    // Auto text color based on percentage
    if (percentage >= 60) return "text-green-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-medium", getTextColor())}>
          {value}
          {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            getColorClass()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
