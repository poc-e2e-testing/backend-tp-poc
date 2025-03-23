import { Entity, Property, ManyToOne, Rel, Ref, BeforeCreate} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { ClientClass } from './clientClass.entity.js';
import bcrypt from 'bcryptjs';
@Entity()
export class Client extends BaseEntity{
         @Property({nullable: false})
         name!: string

         @Property({nullable: false})
         lastname!: string

         @Property({nullable: false})
         birthdate!: Date
         
         @Property({nullable: false})
         email!: string

         @Property({nullable: false})
         phone!: string

         @Property({nullable: false})
         address!: string

         @Property({nullable: false})
         city!: string

         @Property({nullable: false})
         country!: string

         @Property({nullable: false})
         postalCode!: string

         @Property({nullable: false})
         dni!: string

         @Property({ nullable: false, hidden: false })
         password!: string; // Password

         @BeforeCreate()
         async hashPassword() {
           this.password = await bcrypt.hash(this.password, 10);
         }

         @ManyToOne (() => ClientClass, {nullable: false})
         clientClass!: Rel<ClientClass>
        
}
// Path: src/client/client.repository.ts