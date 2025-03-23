import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { MongoEntityManager } from '@mikro-orm/mongodb';
import { Client } from "../../client/client.entity.js";


export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'donjulio',
  type: 'mongo',
  clientUrl: 'mongodb://localhost:27017',
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
