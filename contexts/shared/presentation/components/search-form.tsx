'use client';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Label } from '@/contexts/shared/presentation/components/ui/label';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/contexts/shared/presentation/components/ui/sidebar';

interface SearchFormProps extends React.ComponentProps<'form'> {
  value?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export function SearchForm({
  value = '',
  onValueChange,
  onClear,
  placeholder,
  ...props
}: SearchFormProps) {
  const t = useTranslations('common');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
  };

  const handleClear = () => {
    onClear?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent form submission, search is handled on input change
  };

  const searchPlaceholder = placeholder || t('search');

  return (
    <form onSubmit={handleSubmit} {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            {t('search')}
          </Label>
          <SidebarInput
            id="search"
            value={value}
            onChange={handleInputChange}
            placeholder={searchPlaceholder}
            className="pl-8 pr-8"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute top-1/2 right-1 size-6 p-0 -translate-y-1/2 opacity-50 hover:opacity-100"
            >
              <X className="size-3" />
              <span className="sr-only">{t('clear')}</span>
            </Button>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
