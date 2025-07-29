import { cn } from '@/contexts/shared/presentation/lib/utils';
import { CropFilterButton } from '../../atoms/crop-filter-button/crop-filter-button';

export type CropFilterType = 'all' | 'active' | 'ready';

export interface CropFilterGroupProps {
  activeFilter: CropFilterType;
  onFilterChange: (filter: CropFilterType) => void;
  className?: string;
}

export const CropFilterGroup: React.FC<CropFilterGroupProps> = ({
  activeFilter,
  onFilterChange,
  className,
}) => {
  const filters: CropFilterType[] = ['all', 'active', 'ready'];

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 bg-background border rounded-md p-1',
        className,
      )}
    >
      {filters.map((filter) => (
        <CropFilterButton
          key={filter}
          filter={filter}
          isActive={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
        />
      ))}
    </div>
  );
};
