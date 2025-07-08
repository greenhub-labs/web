import React from "react";
import { Separator } from "../ui/separator";

export interface Alert {
  type: "warning" | "error" | "info";
  message: string;
  icon?: string;
}

export interface AlertsSectionProps {
  alerts: Alert[];
  className?: string;
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({
  alerts,
  className,
}) => {
  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: "🚨",
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: "⚠️",
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: "ℹ️",
        };
      default:
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: "⚠️",
        };
    }
  };

  return (
    <>
      <Separator />
      <div className={`space-y-1 min-h-[1rem] ${className}`}>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => {
            const styles = getAlertStyles(alert.type);
            return (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs ${styles.bg} border ${styles.border} rounded p-2`}
              >
                <span>{alert.icon || styles.icon}</span>
                <span className={styles.text}>{alert.message}</span>
              </div>
            );
          })
        ) : (
          // Reserve space when no alerts - invisible but takes space
          <div
            className="flex items-center gap-2 text-xs p-2 invisible"
            aria-hidden="true"
          >
            <span>⚠️</span>
            <span>Placeholder for consistent height</span>
          </div>
        )}
      </div>
    </>
  );
};

export default AlertsSection;
