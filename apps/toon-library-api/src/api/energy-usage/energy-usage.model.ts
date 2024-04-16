import { Field, ID, ObjectType } from '@nestjs/graphql';
import { EnergyUsageDto, EnergyType, EnergyUsageUnit } from '@toon-library-api/models';

@ObjectType()
export class EnergyUsage implements EnergyUsageDto {
  @Field(() => ID)
  public id: string;

  @Field()
  public month: string;

  @Field()
  public year: number;

  @Field(() => EnergyType)
  public energyType: EnergyType;

  @Field(() => EnergyUsageUnit)
  public unit: EnergyUsageUnit;

  @Field()
  public value: string;
}

@ObjectType()
export class EnergyUsageQueryResult {
  @Field(() => [EnergyUsage])
  public data: EnergyUsage[];
}
