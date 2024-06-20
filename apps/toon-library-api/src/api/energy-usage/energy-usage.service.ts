import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyUsageDto } from '@toon-library-api/models';
import { orderBy } from 'lodash';
import { FindManyOptions, Repository } from 'typeorm';

import { EnergyUsageQueryArgs, EnergyUsageQueryFilter, EnergyUsageQuerySort } from './energy-usage-query.args';

@Injectable()
export class EnergyUsageService {
  constructor(@InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>) {}

  public async getEnergyUsages(options?: EnergyUsageQueryArgs) {
    const filteredData = await this.filterEnergyUsages(options.filter);

    const sortedData = this.sortEnergyUsages(filteredData, options.sort);

    return this.map(sortedData);
  }

  private filterEnergyUsages(filter?: EnergyUsageQueryFilter) {
    const findOptions: FindManyOptions<EnergyUsage> = {};

    if (filter?.energyType) {
      findOptions.where = {
        energyType: filter.energyType,
      };
    }

    if (filter?.month) {
      findOptions.where = {
        ...findOptions.where,
        monthLower: filter.month.toLowerCase(),
      };
    }

    if (filter?.year) {
      findOptions.where = {
        ...findOptions.where,
        year: filter.year
      };
    }

    return this.energyUsageRepo.find(findOptions);
  }

  private sortEnergyUsages(data: EnergyUsage[], sort?: EnergyUsageQuerySort) {
    let sorted = data;

    if (sort?.value) {
      sorted = orderBy(data, 'value', sort.value);
    }

    if (sort?.date) {
      sorted = orderBy(data, d => new Date(`${d.month} ${d.year}`), sort.date);
    }

    return sorted;
  }

  private map(entities: EnergyUsage[]): EnergyUsageDto[] {
    return entities.map(entity => ({
      id: entity.id.toString(),
      month: entity.month,
      year: entity.year,
      energyType: entity.energyType,
      unit: entity.unit,
      value: entity.value,
    }));
  }
}
