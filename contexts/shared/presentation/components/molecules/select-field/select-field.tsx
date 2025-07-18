import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/contexts/shared/presentation/components/ui/select';

interface SelectFieldOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  options: SelectFieldOption[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  helperText,
  error,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          aria-invalid={!!error}
          className="w-full"
          data-testid="select-trigger"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              data-testid={`select-item-${option.value}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? (
        <div className="mt-1 text-xs text-destructive">{error}</div>
      ) : helperText ? (
        <div className="mt-1 text-xs text-muted-foreground">{helperText}</div>
      ) : null}
    </div>
  );
};
