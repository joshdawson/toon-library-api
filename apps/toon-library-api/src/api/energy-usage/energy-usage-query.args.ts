import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { EnergyType } from '@toon-library-api/models';

@InputType()
export class EnergyUsageQueryFilter {
  @Field(() => EnergyType, { nullable: true })
  energyType?: EnergyType;
}

@ArgsType()
export class EnergyUsageQueryArgs {
  @Field({ nullable: true })
  filter?: EnergyUsageQueryFilter;
}
