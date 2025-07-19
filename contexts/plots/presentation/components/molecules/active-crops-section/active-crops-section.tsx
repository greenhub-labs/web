import { useTranslations } from 'next-intl';
import React from 'react';

export interface Crop {
  id: string;
  name: string;
  icon: string;
  plantedDate: string;
  harvestDate: string;
}

export interface ActiveCropsSectionProps {
  crops: Crop[];
  className?: string;
}

export const ActiveCropsSection: React.FC<ActiveCropsSectionProps> = ({
  crops,
  className,
}) => {
  const t = useTranslations();

  return (
    <div className={`space-y-2 sm:space-y-3 ${className}`}>
      <p className="text-xs sm:text-sm font-medium flex items-center gap-2">
        🌾 {t('pages.garden.plots.activeCrops')} ({crops.length})
      </p>
      <div className="h-28 sm:h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="space-y-1.5 sm:space-y-2 pr-2">
          {crops.length > 0 ? (
            crops.map((crop, index) => (
              <div
                key={crop.id}
                className="p-1.5 sm:p-2 bg-accent/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{crop.icon}</span>
                  <span className="font-medium text-xs sm:text-sm">
                    {crop.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-muted-foreground">
                  <div>
                    <p className="text-xs">{t('pages.garden.plots.planted')}</p>
                    <p className="font-medium text-foreground text-xs">
                      {crop.plantedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs">{t('pages.garden.plots.harvest')}</p>
                    <p className="font-medium text-foreground text-xs">
                      {crop.harvestDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <span className="text-xl sm:text-2xl mb-2 block">🌱</span>
                <p className="text-xs sm:text-sm">
                  {t('pages.garden.plots.noCrops')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveCropsSection;
