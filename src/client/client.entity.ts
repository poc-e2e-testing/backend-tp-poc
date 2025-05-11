import {
  Entity,
  Property,
  ManyToOne,
  Rel,
  Ref,
  BeforeCreate,
  OneToMany,
  Collection
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { ClientClass } from './clientClass.entity.js';
import { Order } from '../order/order.entity.js';
import bcrypt from 'bcryptjs';

@Entity()
export class Client extends BaseEntity {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  lastname!: string;

  @Property({ nullable: false })
  birthdate!: Date;

  @Property({ nullable: false, unique: true })
  email!: string;

  @Property({ nullable: false })
  phone!: string;

  @Property({ nullable: false })
  address!: string;

  @Property({ nullable: false })
  city!: string;

  @Property({ nullable: false })
  country!: string;

  @Property({ nullable: false })
  postalCode!: string;

  @Property({ nullable: false })
  dni!: string;

  @Property({ nullable: false })
  role: string = 'client';

  @Property({ nullable: false, hidden: true })
  password!: string;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => Order, order => order.client)
  orders = new Collection<Order>(this);

  @ManyToOne(() => ClientClass, { nullable: false })
  clientClass!: Rel<ClientClass>;
}
