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
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.BASENAME,
      entities: [Films, Schedules],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Films, Schedules]),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [AppRepository],
})
export class AppModule {}

console.log();
