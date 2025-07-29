import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { cn } from '@/contexts/shared/presentation/lib/utils';
import { useTranslations } from 'next-intl';

export interface CropFilterButtonProps {
  filter: 'all' | 'active' | 'ready';
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const CropFilterButton: React.FC<CropFilterButtonProps> = ({
  filter,
  isActive,
  onClick,
  className,
}) => {
  const t = useTranslations();

  const getFilterConfig = (filter: string) => {
    switch (filter) {
      case 'all':
        return { icon: '🌾', label: t('pages.garden.crops.filterAll') };
      case 'active':
        return { icon: '🌱', label: t('pages.garden.crops.filterActive') };
      case 'ready':
        return { icon: '✅', label: t('pages.garden.crops.filterReady') };
      default:
        return { icon: '❓', label: t('pages.garden.crops.filterAll') };
    }
  };

  const config = getFilterConfig(filter);

  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      size="sm"
      onClick={onClick}
      className={cn('px-3 py-2 text-sm', className)}
    >
      {config.icon} {config.label}
    </Button>
  );
};
