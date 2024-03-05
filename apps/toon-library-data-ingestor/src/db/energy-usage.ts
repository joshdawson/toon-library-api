import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class EnergyUsage {
  @ObjectIdColumn()
  public id: ObjectId;

  @Column()
  public month: string;
  
  @Column()
  public year: number;

  @Column()
  public energyType: string;

  @Column()
  public unit: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  updatedAt: Date;
}