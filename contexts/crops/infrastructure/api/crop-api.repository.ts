import { fetchWithAutoRefresh } from '@/contexts/shared/infrastructure/lib/fetch-with-auto-refresh';
import { CropsRepository } from '../../application/ports/crops.repository';
import { CreateCropDto } from '../../domain/dto/create-crop.dto';
import { Crop } from '../../domain/entities/crop.entity';

/**
 * Implementation of UsersRepository.
 */
export class CropsApiRepository implements CropsRepository {
  async getCrops(): Promise<Crop[]> {
    const url = `/api/crops`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'GET',
    });
    const data: Crop[] = await response.json();
    return data;
  }

  async getCropById(cropId: string): Promise<Crop> {
    const url = `/api/crops/get-crop-by-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ id: cropId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: Crop = await response.json();
    return data;
  }

  async getCropsByPlotId(plotId: string): Promise<Crop[]> {
    const url = `/api/crops/get-crops-by-plot-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ plotId }),
    });
    const data: Crop[] = await response.json();
    return data;
  }

  async getCropsByFarmId(farmId: string): Promise<Crop[]> {
    const url = `/api/crops/get-crops-by-farm-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ farmId }),
    });
    const data: Crop[] = await response.json();
    return data;
  }

  async createCrop(crop: CreateCropDto): Promise<Crop> {
    const url = `/api/crops/create-crop`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ crop }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: Crop = await response.json();
    return data;
  }

  async updateCrop(crop: Crop): Promise<Crop> {
    const url = `/api/crops/update-crop`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ crop }),
    });
    const data: Crop = await response.json();
    return data;
  }

  async deleteCrop(cropId: string): Promise<void> {
    const url = `/api/crops/delete-crop`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ id: cropId }),
    });
    return response.json();
  }
}
