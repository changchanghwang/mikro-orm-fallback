import { Property } from "@mikro-orm/decorators/es";

export class BaseEntity {
  // can infer
  @Property({ type: 'datetime', onCreate:()=>new Date() })
  createdAt!: Date

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  private updatedAt!: Date;

  // can't infer
  @Property()
  private createBy!: string;
}
