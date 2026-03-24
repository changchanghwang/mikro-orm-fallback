import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';
import { BaseEntity } from '../base/model';

@Entity()
export class Task extends BaseEntity{
  @PrimaryKey({ autoincrement: true, unsigned: true })
  id!: number;

  @Property()
  title!: string;

  @Property({ type: 'datetime' })
  scheduledAt!: Date;
}
