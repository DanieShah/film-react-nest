import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films/films.entity';
import { Schedules } from './films/schedules.entity';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { AppRepository } from './repository/app.repository/app.repository';
import { DevLogger } from './logger/dev.logger/dev.logger';

console.log({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '.env.example'],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Films, Schedules],
      migrations: [`${__dirname}/**/database/migrations/**/*{.ts,.js}`],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Films, Schedules]),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [AppRepository, DevLogger],
})
export class AppModule {}
