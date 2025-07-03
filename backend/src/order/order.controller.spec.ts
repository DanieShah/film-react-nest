import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { create } from 'domain';
import MakeOrderDto from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService]
    })
    .overrideProvider(OrderService)
    .useValue({
      create: jest.fn,
    })
    .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('create() should make an order', () => {
    const item: MakeOrderDto = {
      'phone': '+111111111111',
      'email': 'check.@test.fn',
      'tickets': []
    }

    const spy = jest.spyOn(service,'create');
    controller.create(item);

    expect(spy).toHaveBeenCalledWith(item);
  });
});
