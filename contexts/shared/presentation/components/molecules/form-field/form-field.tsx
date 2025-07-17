import React from 'react';
import { Label } from '@/contexts/shared/presentation/components/ui/label';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import { Textarea } from '@/contexts/shared/presentation/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/contexts/shared/presentation/components/ui/select';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  disabled?: boolean;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options = [],
  rows = 3,
  disabled = false,
  helperText,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
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
            className={`text-sm${error ? ' border-destructive' : ''}`}
            disabled={disabled}
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger
              className={`w-full text-sm${error ? ' border-destructive' : ''}`}
              disabled={disabled}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                >
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
            className={`text-sm${error ? ' border-destructive' : ''}`}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <div className="mt-1 text-sm text-destructive">{error}</div>}
      {!error && helperText && (
        <div className="mt-1 text-xs text-muted-foreground">{helperText}</div>
      )}
    </div>
  );
};
