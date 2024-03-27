import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyUsageDto } from '@toon-library-api/models';
import axios from 'axios';
import csv from 'csvtojson';
import { Repository } from 'typeorm';

import { env } from '../../config/config';
import { RawElectricityData } from '../models/raw-data';
import { DataService } from './data.service';

@Injectable()
export class ElectricityConsumptionDataService extends DataService<EnergyUsageDto> {
  constructor(
    @InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>
  ) {
    super();
  }

  public async fetch(url: string): Promise<EnergyUsageDto[]> {
    console.log('Fetching electricity consumption', url);

    const response = await axios.get(url, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'X-Github-Api-Version': '2022-11-28',
        'Authorization': `token ${env.GITHUB_TOKEN}`,
      }
    });

    const jsonData = await csv().fromString(response.data) as RawElectricityData[];

    return this.mapElectricityUsage(jsonData);
  }

  public async insert(data: EnergyUsageDto[]) {
    const result = await this.energyUsageRepo.insert(data);
    if (!result) {
      throw new Error('Error inserting electricity consumption data');
    }
  }

  private mapElectricityUsage(raw: RawElectricityData[]): EnergyUsageDto[] {
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
