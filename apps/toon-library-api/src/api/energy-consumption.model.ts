import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EnergyConsumption {
  @Field(() => ID)
  public id: string;

  @Field()
  public month: string;

  @Field()
  public year: number;

  @Field()
  public energyType: string;

  @Field()
  public unit: string;

  @Field()
  public value: string;

  @Field()
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt: Date;
}
