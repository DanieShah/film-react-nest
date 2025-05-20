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
 
    const takenSeats = dataBase.map(el => el.schedule.flatMap(s => s.taken)).flat();
    const isSeatTaken = seats.some(seat => takenSeats.includes(seat));

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
