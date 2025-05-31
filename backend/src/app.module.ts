import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films/films.entity';
import { Schedules } from './films/schedules.entity';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { AppRepository } from './repository/app.repository/app.repository';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD, 
      database: process.env.DATABASE,
      entities: [Films, Schedules],
      synchronize: false, 
    }),
    TypeOrmModule.forFeature([Films, Schedules]),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider, AppRepository],
})
export class AppModule {}

console.log();
