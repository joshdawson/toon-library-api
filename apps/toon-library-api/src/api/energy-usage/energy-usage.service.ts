import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyType, EnergyUsageDto } from '@toon-library-api/models';
import { FindManyOptions, Repository, ILike, Raw, MongoBatchReExecutionError } from 'typeorm';

type GetEngergyUsagesOptions = {
  energyType?: EnergyType;
  month?: string;
  year?: number;
}

@Injectable()
export class EnergyUsageService {
  constructor(@InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>) {}

  public async getEnergyUsages(options?: GetEngergyUsagesOptions) {
    const findOptions: FindManyOptions<EnergyUsage> = {};

    if (options?.energyType) {
      findOptions.where = {
        energyType: options.energyType,
      };
    }

    if (options?.month) {
      findOptions.where = {
        ...findOptions.where,
        monthLower: options.month.toLowerCase(),
      };
    }

    if (options?.year) {
      findOptions.where = {
        ...findOptions.where,
        year: options.year
      };
    }

    const data = await this.energyUsageRepo.find(findOptions);

    return this.map(data);
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
