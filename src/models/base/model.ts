import { Property } from "@mikro-orm/decorators/es";

export class BaseEntity {
  @Property({ type: 'datetime', onCreate:()=>new Date() })
  createdAt!: Date

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  private updatedAt!: Date;

  @Property()
  private createBy!: string;
}
