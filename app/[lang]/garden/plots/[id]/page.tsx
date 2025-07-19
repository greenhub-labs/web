'use client';

import PlotDetailPageComponent from '@/contexts/plots/presentation/components/pages/plot-detail-page/plot-detail-page';
import { usePlot } from '@/contexts/plots/presentation/hooks/use-plot';

interface PlotDetailPageProps {
  params: {
    id: string;
  };
}

const PlotDetailPage = ({ params }: PlotDetailPageProps) => {
  const { id } = params;

  const { getPlotByIdQuery } = usePlot(id);

  return (
    <PlotDetailPageComponent
      plot={getPlotByIdQuery.data || null}
      isLoading={getPlotByIdQuery.isLoading}
    />
  );
};

export default PlotDetailPage;
