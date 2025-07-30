import { fetchWithAutoRefresh } from '@/contexts/shared/infrastructure/lib/fetch-with-auto-refresh';
import { CropsVarietyRepository } from '../../application/ports/crops-variety.repository';
import { CreateCropVarietyDto } from '../../domain/dto/create-crop-variety.dto';
import { UpdateCropVarietyDto } from '../../domain/dto/update-crop-variety.dto';
import { CropVariety } from '../../domain/entities/crops-variety.entity';

/**
 * Implementation of UsersRepository.
 */
export class CropsVarietyApiRepository implements CropsVarietyRepository {
  async getCropsVarieties(): Promise<CropVariety[]> {
    const url = `/api/crops-varieties`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'GET',
    });
    const data: CropVariety[] = await response.json();
    return data;
  }

  async getCropVarietyById(cropVarietyId: string): Promise<CropVariety> {
    const url = `/api/crops-varieties/get-crop-variety-by-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ id: cropVarietyId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: CropVariety = await response.json();
    return data;
  }

  async createCropVariety(
    cropVariety: CreateCropVarietyDto,
  ): Promise<CropVariety> {
    const url = `/api/crops-varieties/create-crop-variety`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ cropVariety }),
    });
    const data: CropVariety = await response.json();
    return data;
  }

  async updateCropVariety(
    cropVariety: UpdateCropVarietyDto,
  ): Promise<CropVariety> {
    const url = `/api/crops-varieties/update-crop-variety`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ cropVariety }),
    });
    const data: CropVariety = await response.json();
    return data;
  }

  async deleteCropVariety(cropVarietyId: string): Promise<void> {
    const url = `/api/crops-varieties/delete-crop-variety`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ id: cropVarietyId }),
    });
    return response.json();
  }
}
