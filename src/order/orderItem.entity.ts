
import { Entity, Property, ManyToOne, PrimaryKey } from "@mikro-orm/core"
import { v4 as uuidv4 } from "uuid"
import { Order } from "./order.entity.js"

@Entity()
export class OrderItem {
  @PrimaryKey()
_id: string = uuidv4()


  @Property()
  productId!: string

  @Property()
  quantity!: number

  @ManyToOne(() => Order)
  order!: () => any

}


