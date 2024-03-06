import { Injectable } from '@nestjs/common';
import { EnergyUsageDto } from '@toon-library-api/models';

import { RawElectricityData } from './models/raw-data';

@Injectable()
export class CsvDataMapperService {
  public mapElectricityUsage(raw: RawElectricityData[]): EnergyUsageDto[] {
    const usages: EnergyUsageDto[] = []

    for (const entry of raw) {
      const { Date: month, ...values } = entry;

      for (const [year, value] of Object.entries(values)) {
        usages.push({
          month,
          year: Number(year),
          energyType: 'electricity',
          unit: 'kWh',
          value,
        });
      }
    }

    return usages;
  }
}
