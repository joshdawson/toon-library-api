import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyType, EnergyUsageDto } from '@toon-library-api/models';
import { FindManyOptions, Repository } from 'typeorm';

type GetEngergyUsagesOptions = {
  energyType?: EnergyType;
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
