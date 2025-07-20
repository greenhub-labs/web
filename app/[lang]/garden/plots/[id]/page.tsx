'use client';

import { useFarmStore } from '@/contexts/farms/presentation/stores/farm-store';
import { Plot } from '@/contexts/plots/domain/entities/plot.entity';
import PlotDetailPageComponent from '@/contexts/plots/presentation/components/pages/plot-detail-page/plot-detail-page';
import { usePlot } from '@/contexts/plots/presentation/hooks/use-plot';
import { usePlotsByFarm } from '@/contexts/plots/presentation/hooks/use-plots-by-farm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PlotDetailPageProps {
  params: {
    id: string;
  };
}

const PlotDetailPage = ({ params }: PlotDetailPageProps) => {
  const router = useRouter();
  const { currentFarm } = useFarmStore();
  const { getPlotByIdQuery, updatePlotMutation } = usePlot(params.id);
  const { deletePlotMutation } = usePlotsByFarm(currentFarm?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    soilType: '',
    soilPh: '',
    status: '',
    width: '',
    length: '',
    height: '',
    unitMeasurement: '',
  });

  // Sync formData with plot data when plot changes
  useEffect(() => {
    if (getPlotByIdQuery.data) {
      const plot = getPlotByIdQuery.data;
      setFormData({
        name: plot.name || '',
        description: plot.description || '',
        soilType: plot.soilType || '',
        soilPh: plot.soilPh?.toString() || '',
        status: plot.status || '',
        width: plot.dimensions?.width?.toString() || '',
        length: plot.dimensions?.length?.toString() || '',
        height: plot.dimensions?.height?.toString() || '',
        unitMeasurement: plot.dimensions?.unitMeasurement || 'm',
      });
    }
  }, [getPlotByIdQuery.data]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (getPlotByIdQuery.data) {
      const existingPlot = getPlotByIdQuery.data;
      const updatedPlot: Plot = {
        ...existingPlot,
        name: formData.name,
        description: formData.description,
        soilType: formData.soilType,
        soilPh: parseFloat(formData.soilPh) || 0,
        status: formData.status,
        dimensions: {
          ...existingPlot.dimensions,
          width: parseFloat(formData.width) || 0,
          length: parseFloat(formData.length) || 0,
          height: parseFloat(formData.height) || 0,
          unitMeasurement: formData.unitMeasurement,
        },
      };

      // Remove farmId from the update request
      const { farmId, ...plotWithoutFarmId } = updatedPlot;
      updatePlotMutation.mutate(plotWithoutFarmId as Plot);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (getPlotByIdQuery.data) {
      deletePlotMutation.mutate(getPlotByIdQuery.data.id, {
        onSuccess: () => {
          router.push('/garden/plots');
        },
      });
    }
  };

  const handleCancel = () => {
    if (getPlotByIdQuery.data) {
      const plot = getPlotByIdQuery.data;
      setFormData({
        name: plot.name || '',
        description: plot.description || '',
        soilType: plot.soilType || '',
        soilPh: plot.soilPh?.toString() || '',
        status: plot.status || '',
        width: plot.dimensions?.width?.toString() || '',
        length: plot.dimensions?.length?.toString() || '',
        height: plot.dimensions?.height?.toString() || '',
        unitMeasurement: plot.dimensions?.unitMeasurement || 'm',
      });
    }
    setIsEditing(false);
  };

  return (
    <PlotDetailPageComponent
      plot={getPlotByIdQuery.data || null}
      isLoading={getPlotByIdQuery.isLoading}
      isEditing={isEditing}
      formData={formData}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={handleDelete}
      onInputChange={handleInputChange}
    />
  );
};

export default PlotDetailPage;
