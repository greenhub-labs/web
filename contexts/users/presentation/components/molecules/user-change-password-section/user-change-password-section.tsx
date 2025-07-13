import React from 'react';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export interface UserChangePasswordSectionProps {
  current: string;
  new: string;
  confirm: string;
  onChange: (field: 'current' | 'new' | 'confirm', value: string) => void;
  onSubmit: () => void;
  showCurrent: boolean;
  showNew: boolean;
  toggleShowCurrent: () => void;
  toggleShowNew: () => void;
  currentLabel: string;
  newLabel: string;
  confirmLabel: string;
  buttonLabel: string;
  disabled?: boolean;
}

export const UserChangePasswordSection: React.FC<
  UserChangePasswordSectionProps
> = ({
  current,
  new: newPassword,
  confirm,
  onChange,
  onSubmit,
  showCurrent,
  showNew,
  toggleShowCurrent,
  toggleShowNew,
  currentLabel,
  newLabel,
  confirmLabel,
  buttonLabel,
  disabled,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{currentLabel}</label>
          <div className="relative">
            <Input
              type={showCurrent ? 'text' : 'password'}
              value={current}
              onChange={(e) => onChange('current', e.target.value)}
              disabled={disabled}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={toggleShowCurrent}
              tabIndex={-1}
            >
              {showCurrent ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{newLabel}</label>
          <div className="relative">
            <Input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => onChange('new', e.target.value)}
              disabled={disabled}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={toggleShowNew}
              tabIndex={-1}
            >
              {showNew ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{confirmLabel}</label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => onChange('confirm', e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <Button
        onClick={onSubmit}
        className="w-full md:w-auto"
        disabled={disabled}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};
