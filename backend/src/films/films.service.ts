import { Injectable } from '@nestjs/common';
import { AppRepository } from '../repository/app.repository/app.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: AppRepository) {}

  async findById(id: string) {
    try {
      const film = await this.filmsRepository.findById();
      const needFilm = await film.find((res) => res.id === id);
      const needSchedule = needFilm.schedule;
      const total: number = needSchedule.length;
      const needArr = {
        items: needSchedule,
        total,
      };

      return needArr;
    } catch (error) {
      throw new Error('Произошла ошибка ' + error.message);
    }
  }

  async findAll() {
    try {
      const film = await this.filmsRepository.findAll();
      const total: number = film.length;

      const needArr = {
        items: film,
        total,
      };

      return needArr;
    } catch (error) {
      throw new Error('Произошла ошибка ' + error.message);
    }
  }
}
