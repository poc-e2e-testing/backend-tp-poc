import { MikroORM } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { MongoEntityManager } from '@mikro-orm/mongodb';
import { Client } from '../../client/client.entity.js';
import dotenv from 'dotenv';
dotenv.config();

// Seleccionar URI de MongoDB según NODE_ENV
const getMongoUri = (): string => {
  const nodeEnv = process.env.NODE_ENV || 'development';

  if (nodeEnv === 'test') {
    return (
      process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/donjulio_test'
    );
  }

  return (
    process.env.MONGO_URI_DEV ||
    process.env.MONGO_URI ||
    'mongodb://localhost:27017/donjulio'
  );
};

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'donjulio',
  type: 'mongo',
  clientUrl: getMongoUri(),
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
  const generator = orm.getSchemaGenerator();
  /*
    await generator.dropSchema()
    await generator.createSchema()
    */
  await generator.updateSchema();
};
export const DI = {
  em: orm.em as MongoEntityManager,
  clientRepository: orm.em.getRepository(Client),
};
