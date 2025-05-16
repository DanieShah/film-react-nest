import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository/films.repository';

@Injectable()
export class FilmsService {
  //   constructor(@InjectModel('Film') private readonly filmModel: Model<IFilm>) {}
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findById(id: string) {
    const film = await this.filmsRepository.findById();
    const needFilm = await film.find((res) => res.id === id);
    const needSchedule = needFilm.schedule;
    const needArr = {
      items: needSchedule,
    };

    return needArr;
  }

  async findAll() {
    const film = await this.filmsRepository.findAll();
    const total: number = film.length;

    const needArr = {
      items: film,
      total
    };

    return needArr;
  }
}
