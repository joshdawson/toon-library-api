import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { EnergyType } from '@toon-library-api/models';

export enum SortType {
  asc = 'asc',
  desc = 'desc',
}

@InputType()
export class EnergyUsageQuerySort {
  @Field(() => SortType, { nullable: true })
  date: SortType;

  @Field(() => SortType, { nullable: true })
  value: SortType;
}

@InputType()
export class EnergyUsageQueryFilter {
  @Field(() => EnergyType, { nullable: true })
  energyType?: EnergyType;

  @Field({ nullable: true })
  month: string;

  @Field({ nullable: true })
  year: number;
}

@ArgsType()
export class EnergyUsageQueryArgs {
  @Field({ nullable: true })
  filter?: EnergyUsageQueryFilter;

  @Field({ nullable: true })
  sort?: EnergyUsageQuerySort;
}
