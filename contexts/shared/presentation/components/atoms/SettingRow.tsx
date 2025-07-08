import React from "react";
import { cn } from "../../lib/utils";

export interface SettingRowProps {
  title: string;
  description?: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const SettingRow: React.FC<SettingRowProps> = ({
  title,
  description,
  icon,
  children,
  className,
  orientation = "horizontal",
}) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border bg-card",
        orientation === "vertical" ? "flex-col" : "justify-between",
        className
      )}
    >
      <div className="flex items-start gap-3 flex-1">
        {icon && <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>}
        <div className="space-y-1 flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground leading-none">
            {title}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      {children && (
        <div
          className={cn(
            "flex-shrink-0",
            orientation === "vertical" ? "w-full" : "ml-auto"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingRow;
