import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSpecializationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString({ each: true })
  experts: string[];
}
