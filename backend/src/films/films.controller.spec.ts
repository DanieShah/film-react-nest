import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { AppRepository } from '../repository/app.repository/app.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films.entity';
import { Schedules } from './schedules.entity';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [FilmsController],
        providers: [FilmsService],
    })
    .overrideProvider(FilmsService)
    .useValue({
      findById: jest.fn(),
      findAll: jest.fn()
    })
    .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('.findAll() should return all movies', () => {
    controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
  });

  it('.find() should retrun film by id', () => {
    const id: string = 'some id to check';

    controller.find(id);

    expect(service.findById).toHaveBeenCalledWith(id);
  })
});
