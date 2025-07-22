import { StatusBadge } from '@/contexts/shared/presentation/components/atoms/StatusBadge';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface PlotStatusBadgeProps {
  status: string;
  className?: string;
}

export const PlotStatusBadge: React.FC<PlotStatusBadgeProps> = ({
  status,
  className,
}) => {
  const t = useTranslations();

  const getPlotStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return {
          color: 'bg-green-100 text-green-700',
          icon: '✅',
          label: t('pages.garden.plots.status.active'),
        };
      case 'inactive':
        return {
          color: 'bg-gray-100 text-gray-700',
          icon: '⏸️',
          label: t('pages.garden.plots.status.inactive'),
        };
      case 'preparing':
        return {
          color: 'bg-blue-100 text-blue-700',
          icon: '🔧',
          label: t('pages.garden.plots.status.preparing'),
        };
      case 'resting':
        return {
          color: 'bg-orange-100 text-orange-700',
          icon: '🌱',
          label: t('pages.garden.plots.status.resting'),
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700',
          icon: '❓',
          label: t('pages.garden.plots.status.inactive'),
        };
    }
  };

  const config = getPlotStatusConfig(status);

  return (
    <StatusBadge
      status={status}
      label={config.label}
      icon={config.icon}
      color={config.color}
      className={className}
    />
  );
};

export default PlotStatusBadge;
