import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { AppRepository } from '../repository/app.repository/app.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from '../films/films.entity';
import { Schedules } from '../films/schedules.entity';
import { OrderController } from './order.controller';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [OrderService],
    })
    .overrideProvider(OrderService)
    .useValue({})
    .compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
