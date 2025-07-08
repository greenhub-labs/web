import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";

export interface SettingsSectionProps {
  title: string;
  subtitle?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  subtitle,
  icon,
  children,
  className,
  headerActions,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {icon && <span className="text-xl">{icon}</span>}
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && (
            <div className="flex-shrink-0 ml-4">{headerActions}</div>
          )}
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
};

export default SettingsSection;
