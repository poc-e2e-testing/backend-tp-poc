import {
  Entity,
  Property,
  PrimaryKey,
  Collection,
  OneToMany,
  Cascade,
  ManyToOne,
  Ref
} from "@mikro-orm/core"
import { v4 as uuidv4 } from "uuid"
import { OrderItem } from "./orderItem.entity.js"
import { Client } from "../client/client.entity.js"

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

  @Property()
  dni!: string

  @Property()
  city!: string

  @Property()
  postalCode!: string

  @OneToMany(() => OrderItem, item => item.order, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE]
  })
  items = new Collection<OrderItem>(this)

  @ManyToOne(() => Client)
  client!: Ref<Client>

  // @Property()
  // email!: string
}
