import { Injectable } from '@nestjs/common';
import MakeOrderDto from './dto/order.dto';
import { AppRepository } from 'src/repository/app.repository/app.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: AppRepository) {}
  async create(makeOrderDto: MakeOrderDto) {
    const tickets = makeOrderDto.tickets;
    const dataBase = await this.filmsRepository.findAll();
    const total: number = tickets.length;
    const seats: string[] = tickets.map((res) => {
      return `${res.row}:${res.seat}`;
    });
    const filmBase = dataBase.find((el) => {
      return el.id === tickets[0].film;
    });
    const scheduleBase = filmBase.schedule.find((el) => {
      return el.id === tickets[0].session;
    }).taken;
    const isSeatTaken = seats.some((seat) => scheduleBase.includes(seat));
    if (isSeatTaken) {
      throw new Error('Некоторые билеты на указанные места уже заняты.');
    }
    const result = {
      items: tickets,
      total: total,
    };
    try {
      await this.filmsRepository.create(tickets[0], seats);
    } catch (error) {
      console.log(tickets[0]);
      console.log('Произошла ошибка ' + error.message);
      throw new Error('Произошла ошибка ' + error.message); 
    }
    return result;
  }
}
