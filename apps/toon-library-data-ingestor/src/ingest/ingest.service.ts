import { Injectable } from '@nestjs/common';

import { CsvReaderService } from './csv-reader.service';
import { EnergyUsageService } from './energy-usage.service';

@Injectable()
export class IngestService {
  constructor(
    private csvReaderService: CsvReaderService,
    private energyUsageService: EnergyUsageService,
  ) {}

  public async ingest() {
    return this.ingestElectricityConsumption();
  }

  private async ingestElectricityConsumption() {
    const electricityConsumptionData = await this.csvReaderService.readElectricityConsumption();

    return this.energyUsageService.insert(electricityConsumptionData);
  }
}
