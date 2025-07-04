import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import MakeOrderDto from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() makeOrderDto: MakeOrderDto) {
    return this.orderService.create(makeOrderDto);
  }
}
