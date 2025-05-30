import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from 'src/films/films.entity';
import { Schedules } from 'src/films/schedules.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppRepository {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    @InjectRepository(Schedules)
    private readonly schedulesRepository: Repository<Schedules>,
  ) {}

  async findAll() {
    return await this.filmsRepository.find({
      relations: {
        schedule: true,
      },
    });
  }

  async findById() {
    return await this.filmsRepository.find({
      relations: {
        schedule: true,
      },
    });
  }

  async create(tickets, seat) {
    const needId = tickets.film;
    const schedule = await this.schedulesRepository.findOneBy({
      filmId: needId,
      daytime: tickets.daytime,
    });
    const seetList: string = seat.join(', ');
    const needSchedule = {
      ...schedule,
      taken: seetList,
    };

    return await this.schedulesRepository.save(needSchedule);
  }
}
