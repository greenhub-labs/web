'use client';

// New reusable components
import PlotsPageComponent from '@/contexts/plots/presentation/components/pages/plots-page/plots-page';

const PlotsPage = () => {
  return (
    <PlotsPageComponent
      plots={getPlotsByFarmIdQuery.data || []}
      isLoading={getPlotsByFarmIdQuery.isLoading}
    />
  );
};

export default PlotsPage;
