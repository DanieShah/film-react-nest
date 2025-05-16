//TODO описать DTO для запросов к /films
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetScheduleDTO {
  @IsString()
  id: string;
  @IsString()
  daytime: string;
  @IsNumber()
  hall: number;
  @IsNumber()
  rows: number;
  @IsNumber()
  seats: number;
  @IsNumber()
  price: number;
  @IsNotEmpty()
  taken: string[];
}

export class GetFilmDTO {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDTO[];
}
