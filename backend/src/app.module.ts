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

console.log('Здесь мы создаем ссылку ' + "postgres://db:5432/nest_project");

const dataBaseUrl = new URL("postgres://db:5432/nest_project");

console.log('Сылка ' + dataBaseUrl);

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
      host: dataBaseUrl.host.split(':')[0],
      port: Number(dataBaseUrl.port),
      database: dataBaseUrl.pathname.substring(1),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
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
