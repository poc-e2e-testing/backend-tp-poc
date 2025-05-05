import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { MongoEntityManager } from '@mikro-orm/mongodb';
import { Client } from "../../client/client.entity.js";
import dotenv from 'dotenv';
dotenv.config();


export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'donjulio',
  type: 'mongo',
  clientUrl: process.env.MONGO_URI,
  highlighter: new MongoHighlighter(),
  debug: true,
  schemaGenerator: {
    //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    /*
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema()
}
export const DI = {
  em: orm.em as MongoEntityManager,
  clientRepository: orm.em.getRepository(Client),
};
