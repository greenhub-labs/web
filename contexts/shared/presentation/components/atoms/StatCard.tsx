import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  className,
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">{title}</p>
            <p className="text-lg sm:text-xl font-bold">{value}</p>
          </div>
          <span className="text-xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
