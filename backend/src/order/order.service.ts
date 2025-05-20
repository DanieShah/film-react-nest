import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository/films.repository';
import MakeOrderDto from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(makeOrderDto: MakeOrderDto) {
    const tickets = makeOrderDto.tickets;
    const dataBase = await this.filmsRepository.findAll();
    const total: number = tickets.length;
    const seats: string[] = tickets.map((res) => {
      return `${res.row}:${res.seat}`; 
    });

    const filmBase = dataBase.find(el => {
      return el.id === tickets[0].film;
    });

    const scheduleBase = filmBase.schedule.find(el => {
      console.log(el.id + ' ' +  tickets[0].session);
      return el.id === tickets[0].session;
    }).taken;

    console.log(scheduleBase);
    const isSeatTaken = seats.some(seat => scheduleBase.includes(seat));

    if (isSeatTaken) {
      throw new Error('Некоторые билеты на указанные места уже заняты.'); 
    }

    const result = {
      items: tickets,
      total: total,
    };
    await this.filmsRepository.create(tickets[0], seats);

    return result;
  }
}
