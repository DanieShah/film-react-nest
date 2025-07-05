import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFilmDTO } from 'src/films/dto/films.dto';
import { IFilm } from 'src/films/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private readonly filmModel: Model<IFilm>) {}

  async findById() {
    return (await this.filmModel.find({}).lean()) as GetFilmDTO[];
  }

  async findAll() {
    return (await this.filmModel.find({}).lean()) as GetFilmDTO[];
  }

  async create(tickets, seats) {
    return await this.filmModel
      .findOneAndUpdate(
        {
          'schedule.id': tickets.session,
        },
        {
          $push: { 'schedule.$.taken': seats },
        },
        {
          new: true,
        },
      )
      .lean();
  }
}
