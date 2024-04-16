import { EnergyType, EnergyUsageUnit } from '@toon-library-api/models';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class EnergyUsage {
  @ObjectIdColumn()
  public id!: ObjectId;

  @Column()
  public month!: string;
  
  @Column()
  public year!: number;

  @Column()
  public energyType!: EnergyType;

  @Column()
  public unit!: EnergyUsageUnit;

  @Column()
  public value!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date | null = null;
}