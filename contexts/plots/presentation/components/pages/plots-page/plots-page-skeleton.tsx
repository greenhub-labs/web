import { PageTemplate } from '@/contexts/shared/presentation/components/templates/page-template';
import { Skeleton } from '@/contexts/shared/presentation/components/ui/skeleton';
import { useTranslations } from 'next-intl';

export const PlotsPageSkeleton = () => {
  const t = useTranslations();
  const tNavigation = useTranslations('navigation');

  const breadcrumbItems = [
    { label: tNavigation('garden.title'), href: '/garden' },
  ];

  return (
    <PageTemplate
      pageTitle={tNavigation('garden.plots')}
      breadcrumbItems={breadcrumbItems}
      headerActions={
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Plots Grid Skeleton */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};
