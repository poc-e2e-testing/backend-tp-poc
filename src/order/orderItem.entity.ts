import { Entity, Property, PrimaryKey, ManyToOne, Ref } from '@mikro-orm/core';
import { Order } from './order.entity.js';
import crypto from 'crypto';

@Entity()
export class OrderItem {
  @PrimaryKey({ name: '_id' })
  _id: string = crypto.randomUUID(); // importante para MongoDB

  @Property()
  productId!: string;

  @Property()
  quantity!: number;

  @ManyToOne(() => Order)
  order!: Ref<Order>;
}
