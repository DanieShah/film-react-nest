import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'nest_project',
  entities: [`${__dirname}/**/**/*.entity.{ts,js}`],
  synchronize: true,
});
