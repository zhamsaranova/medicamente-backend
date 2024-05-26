import { IsString } from 'class-validator';

export class CreateRecordTimeDto {
  @IsString()
  time: string;
}
