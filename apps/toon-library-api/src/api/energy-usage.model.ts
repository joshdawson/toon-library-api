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

  @Field(() => String)
  public energyType: EnergyType;

  @Field(() => String)
  public unit: EnergyUsageUnit;

  @Field()
  public value: string;

  @Field()
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt: Date;
}
