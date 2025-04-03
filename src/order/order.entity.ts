import { Entity, Property, PrimaryKey, Collection, OneToMany, Cascade } from "@mikro-orm/core"
import { v4 as uuidv4 } from "uuid"
import { OrderItem } from "./orderItem.entity.js"

@Entity()
export class Order {
  
  @PrimaryKey()
_id: string = uuidv4()


  @Property()
  name!: string

  @Property()
  address!: string

  @Property()
  phone!: string

  @Property()
  paymentMethod!: string

  @Property()
  createdAt: Date = new Date()

  @OneToMany(() => OrderItem, item => item.order, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE]
  })
  items = new Collection<OrderItem>(this)
  email: any
}
