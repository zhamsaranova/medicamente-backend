import { IsDateString, IsString } from 'class-validator';

export class AppointmentCreateDto {
  @IsString()
  fullname: string;

  @IsString()
  birthDate: string;

  @IsDateString()
  date: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  expertId: string;
}
