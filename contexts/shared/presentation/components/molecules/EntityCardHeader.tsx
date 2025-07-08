import React from "react";
import { CardHeader, CardTitle } from "../ui/card";
import { StatusBadge } from "../atoms/StatusBadge";

export interface EntityCardHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  status: string;
  statusType: "plot" | "crop" | "irrigation" | "planting";
  statusLabel: string;
  className?: string;
}

export const EntityCardHeader: React.FC<EntityCardHeaderProps> = ({
  icon,
  title,
  subtitle,
  status,
  statusType,
  statusLabel,
  className,
}) => {
  return (
    <CardHeader className={`pb-3 ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base truncate">{title}</CardTitle>
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          </div>
        </div>
        <StatusBadge status={status} type={statusType} label={statusLabel} />
      </div>
    </CardHeader>
  );
};

export default EntityCardHeader;
