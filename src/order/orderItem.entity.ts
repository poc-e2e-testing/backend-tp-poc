import { Entity, PrimaryKey, Property, ManyToOne, Ref } from "@mikro-orm/core"
import { Order } from "./order.entity.js"

@Entity()
export class OrderItem {
  @PrimaryKey()
  _id!: string

  @Property()
  productId!: string

  @Property()
  quantity!: number

  @ManyToOne(() => Order)
  order!: Ref<Order> 
}
