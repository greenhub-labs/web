import { fetchWithAutoRefresh } from '@/contexts/shared/infrastructure/lib/fetch-with-auto-refresh';
import { PlotsRepository } from '../../application/ports/plots.repository';
import { CreatePlotDto } from '../../domain/dto/create-plot.dto';
import { Plot } from '../../domain/entities/plot.entity';

/**
 * Implementation of UsersRepository.
 */
export class PlotsApiRepository implements PlotsRepository {
  async getPlots(): Promise<Plot[]> {
    const url = `/api/plots`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'GET',
    });
    const data: Plot[] = await response.json();
    return data;
  }

  async getPlotById(plotId: string): Promise<Plot> {
    const url = `/api/plots/get-plot-by-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ id: plotId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: Plot = await response.json();
    return data;
  }

  async getPlotsByFarmId(farmId: string): Promise<Plot[]> {
    const url = `/api/plots/get-plots-by-farm-id`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ farmId }),
    });
    const data: Plot[] = await response.json();
    return data;
  }

  async createPlot(plot: CreatePlotDto): Promise<Plot> {
    const url = `/api/plots/create-plot`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ plot }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: Plot = await response.json();
    return data;
  }

  async updatePlot(plot: Plot): Promise<Plot> {
    const url = `/api/plots/update-plot`;
    const response = await fetchWithAutoRefresh(url, {
      method: 'POST',
      body: JSON.stringify({ plot }),
    });
    const data: Plot = await response.json();
    return data;
  }
}
