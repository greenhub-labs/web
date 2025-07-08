import React from "react";
import {
  Droplets,
  Lightbulb,
  Thermometer,
  UtensilsCrossed,
  DoorOpen,
  Settings,
} from "lucide-react";

export type ScheduleType =
  | "irrigation"
  | "lighting"
  | "climate"
  | "feeding"
  | "doors"
  | "custom";

interface ScheduleTypeIconProps {
  type: ScheduleType;
  className?: string;
  size?: number;
}

export const ScheduleTypeIcon: React.FC<ScheduleTypeIconProps> = ({
  type,
  className = "",
  size = 20,
}) => {
  const getIcon = (type: ScheduleType) => {
    const iconProps = {
      size,
      className: `${className}`,
    };

    switch (type) {
      case "irrigation":
        return (
          <Droplets {...iconProps} className={`text-blue-600 ${className}`} />
        );
      case "lighting":
        return (
          <Lightbulb
            {...iconProps}
            className={`text-yellow-600 ${className}`}
          />
        );
      case "climate":
        return (
          <Thermometer
            {...iconProps}
            className={`text-orange-600 ${className}`}
          />
        );
      case "feeding":
        return (
          <UtensilsCrossed
            {...iconProps}
            className={`text-green-600 ${className}`}
          />
        );
      case "doors":
        return (
          <DoorOpen {...iconProps} className={`text-purple-600 ${className}`} />
        );
      case "custom":
        return (
          <Settings {...iconProps} className={`text-gray-600 ${className}`} />
        );
      default:
        return (
          <Settings {...iconProps} className={`text-gray-600 ${className}`} />
        );
    }
  };

  return getIcon(type);
};

export type { ScheduleTypeIconProps };
