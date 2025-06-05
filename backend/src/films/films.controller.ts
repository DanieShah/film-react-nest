import { Controller, Get, HttpException, HttpStatus, Logger, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    try {
      // return this.filmsService.findAll();
      return {
        driver: process.env.DATABASE_DRIVER,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        basename: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
      }
    } catch(error) {
      const errorMessage = 'Ошибка при поиске фильмов: ' + error.message;
      Logger.error(errorMessage, error.stack); 
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);  
    }
  }

  @Get(':id/schedule')
  find(@Param('id') id: string) {
    return this.filmsService.findById(id);
  }
}
