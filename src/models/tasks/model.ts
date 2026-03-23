import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

@Entity()
export class Task {
  @PrimaryKey({ autoincrement: true, unsigned: true })
  id!: number;

  @Property()
  title!: string;

  @Property({ type: 'datetime' })
  scheduledAt!: Date;
}
