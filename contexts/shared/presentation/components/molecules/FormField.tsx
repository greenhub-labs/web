import React from "react";
import { Label } from "@/contexts/shared/presentation/components/ui/label";
import { Input } from "@/contexts/shared/presentation/components/ui/input";
import { Textarea } from "@/contexts/shared/presentation/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/contexts/shared/presentation/components/ui/select";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "number" | "textarea" | "select";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options = [],
  rows = 3,
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e.target.value)
            }
            rows={rows}
            className={error ? "border-destructive" : ""}
          />
        );

      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={error ? "border-destructive" : ""}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            className={error ? "border-destructive" : ""}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
