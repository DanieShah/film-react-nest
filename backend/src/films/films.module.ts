import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from './films.entity';
import { AppRepository } from 'src/repository/app.repository/app.repository';
import { Schedules } from './schedules.entity';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, AppRepository],
  imports: [TypeOrmModule.forFeature([Films, Schedules])],
})
export class FilmsModule {}
