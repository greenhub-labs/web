import React from "react";
import { Button } from "../ui/button";

export interface CardAction {
  label: string;
  icon: string;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost" | "destructive";
  disabled?: boolean;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  isPrimary?: boolean;
}

export interface EntityCardActionsProps {
  actions: CardAction[];
  className?: string;
}

export const EntityCardActions: React.FC<EntityCardActionsProps> = ({
  actions,
  className,
}) => {
  return (
    <div className={`flex gap-1 pt-2 ${className}`}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || "outline"}
          size="sm"
          className={`
            text-xs h-8
            ${action.isPrimary ? "flex-1" : "w-8 p-0"}
            ${action.mobileOnly ? "md:hidden" : ""}
            ${action.desktopOnly ? "hidden md:inline-flex" : ""}
          `}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.isPrimary ? (
            <>
              <span className="md:hidden">{action.icon}</span>
              <span className="hidden md:inline">
                {action.icon} {action.label}
              </span>
            </>
          ) : (
            action.icon
          )}
        </Button>
      ))}
    </div>
  );
};

export default EntityCardActions;
