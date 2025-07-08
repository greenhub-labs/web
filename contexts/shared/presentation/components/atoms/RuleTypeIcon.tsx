import React from "react";
import {
  Droplets,
  Clock,
  CloudRain,
  Thermometer,
  Settings,
} from "lucide-react";

export type RuleType =
  | "moisture"
  | "schedule"
  | "weather"
  | "temperature"
  | "manual";

interface RuleTypeIconProps {
  type: RuleType;
  className?: string;
  size?: number;
}

export const RuleTypeIcon: React.FC<RuleTypeIconProps> = ({
  type,
  className = "",
  size = 20,
}) => {
  const getIcon = (type: RuleType) => {
    const iconProps = {
      size,
      className: `${className}`,
    };

    switch (type) {
      case "moisture":
        return (
          <Droplets {...iconProps} className={`text-blue-600 ${className}`} />
        );
      case "schedule":
        return (
          <Clock {...iconProps} className={`text-purple-600 ${className}`} />
        );
      case "weather":
        return (
          <CloudRain {...iconProps} className={`text-green-600 ${className}`} />
        );
      case "temperature":
        return (
          <Thermometer
            {...iconProps}
            className={`text-orange-600 ${className}`}
          />
        );
      case "manual":
        return (
          <Settings {...iconProps} className={`text-gray-600 ${className}`} />
        );
      default:
        return (
          <Droplets {...iconProps} className={`text-blue-600 ${className}`} />
        );
    }
  };

  return <div className="flex-shrink-0">{getIcon(type)}</div>;
};
