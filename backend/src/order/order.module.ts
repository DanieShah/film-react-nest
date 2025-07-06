import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AppRepository } from 'src/repository/app.repository/app.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from 'src/films/films.entity';
import { Schedules } from 'src/films/schedules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films, Schedules])],
  controllers: [OrderController],
  providers: [OrderService, AppRepository],
})
export class OrderModule {}
