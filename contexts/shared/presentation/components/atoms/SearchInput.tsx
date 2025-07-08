import React from "react";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  size = "md",
  showIcon = true,
}) => {
  const sizeClasses = {
    sm: "h-8 text-xs px-3",
    md: "h-9 text-sm px-3",
    lg: "h-10 text-base px-4",
  };

  return (
    <div className={cn("relative", className)}>
      {showIcon && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-muted-foreground text-sm">🔍</span>
        </div>
      )}
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          sizeClasses[size],
          showIcon && "pl-9",
          "bg-background border-input"
        )}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm">✕</span>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
