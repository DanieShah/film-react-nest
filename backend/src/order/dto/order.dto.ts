import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class TicketDTO {
  @IsString()
  film: string;
  @IsString()
  session: string;
  @IsString()
  daytime: string;
  @IsString()
  day: string;
  @IsString()
  time: string;
  @IsNumber()
  @IsNumber()
  row: number;
  @IsNumber()
  seat: number;
  @IsNumber()
  price: number;
}

class MakeOrderDto {
  @IsString()
  phone: string;
  @IsString()
  email: string;
  @IsNotEmpty()
  tickets: TicketDTO[];
}

export default MakeOrderDto;
