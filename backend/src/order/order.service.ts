import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository/films.repository';
import MakeOrderDto from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(makeOrderDto: MakeOrderDto) {
    const tickets = makeOrderDto.tickets;
    const total: number = tickets.length;
    const seats: string[] = tickets.map((res) => {
      return `${res.row}:${res.seat}`;
    });
    const result = {
      items: tickets,
      total: total,
    };
    await this.filmsRepository.create(tickets[0], seats);

    return result;
  }
}
