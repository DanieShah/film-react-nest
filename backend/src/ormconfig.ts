import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.BASENAME,
  entities: [`${__dirname}/**/**/*.entity.{ts,js}`],
  synchronize: false,
});
