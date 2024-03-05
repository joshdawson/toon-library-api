import { Injectable } from '@nestjs/common';

import { EnergyUsageService } from '../ingest/energy-usage.service';

@Injectable()
export class AppService {
  constructor(private energyUsageService: EnergyUsageService) {}

  public async run(): Promise<void> {
    try {
      this.energyUsageService.create();
    } catch (error) {
      console.error(error);
    }
  }
}
