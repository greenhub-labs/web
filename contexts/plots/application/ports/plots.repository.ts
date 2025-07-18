import { CreatePlotDto } from '../../domain/dto/create-plot.dto';
import { Plot } from '../../domain/entities/plot.entity';

export interface PlotsRepository {
  getPlots(): Promise<Plot[]>;
  getPlotById(plotId: string): Promise<Plot>;
  getPlotsByFarmId(farmId: string): Promise<Plot[]>;
  createPlot(plot: CreatePlotDto): Promise<Plot>;
  updatePlot(plot: Plot): Promise<Plot>;
}
