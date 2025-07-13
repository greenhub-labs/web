import React from 'react';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import { Textarea } from '@/contexts/shared/presentation/components/ui/textarea';

export interface UserPersonalInfoSectionProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  onChange: (field: string, value: string) => void;
  disabled?: boolean;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  bioLabel: string;
  bioPlaceholder: string;
}

export const UserPersonalInfoSection: React.FC<
  UserPersonalInfoSectionProps
> = ({
  firstName,
  lastName,
  email,
  phone,
  bio,
  onChange,
  disabled,
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  phoneLabel,
  bioLabel,
  bioPlaceholder,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">{firstNameLabel}</label>
        <Input
          value={firstName || ''}
          onChange={(e) => onChange('firstName', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{lastNameLabel}</label>
        <Input
          value={lastName || ''}
          onChange={(e) => onChange('lastName', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{emailLabel}</label>
        <Input
          value={email || ''}
          onChange={(e) => onChange('email', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{phoneLabel}</label>
        <Input
          value={phone || ''}
          onChange={(e) => onChange('phone', e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-medium">{bioLabel}</label>
        <Textarea
          placeholder={bioPlaceholder}
          value={bio || ''}
          onChange={(e) => onChange('bio', e.target.value)}
          disabled={disabled}
          className="min-h-20"
        />
      </div>
    </div>
  );
};
