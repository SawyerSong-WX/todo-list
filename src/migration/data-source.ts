import 'reflect-metadata';
import { DataSource } from 'typeorm';

require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  entities:
    process.env.NODE_ENV != 'development'
      ? [`${__dirname}/dist/**/*{.ts,.js}`]
      : [`${__dirname}/src/pojo/entity/*.ts`],
  migrationsTableName: 'migration',
  migrations: [`./src/migration/script/*.ts`],
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
