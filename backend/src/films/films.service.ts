import { Injectable } from '@nestjs/common';
import { AppRepository } from 'src/repository/app.repository/app.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: AppRepository) {}

  async findById(id: string) {
    const film = await this.filmsRepository.findById();
    const needFilm = await film.find((res) => res.id === id);
    const needSchedule = needFilm.schedule;
    const total: number = needSchedule.length;
    const needArr = {
      items: needSchedule,
      total,
    };

    return needArr;
  }

  async findAll() {
    const film = await this.filmsRepository.findAll();
    const total: number = film.length;

    const needArr = {
      items: film,
      total,
    };

    return needArr;
  }
}
