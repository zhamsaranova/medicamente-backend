import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ExpertDto {
  @IsString()
  @MinLength(1, { message: 'Lenght must be at least 1 character' })
  @MaxLength(50, { message: 'Length cannnot be over 50 characters' })
  firstName: string;

  @IsString()
  @MinLength(1, { message: 'Lenght must be at least 1 character' })
  @MaxLength(50, { message: 'Length cannnot be over 50 characters' })
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Lenght must be at least 1 character' })
  @MaxLength(50, { message: 'Length cannnot be over 50 characters' })
  middleName: string;

  @IsString()
  slug: string;

  @IsOptional()
  experienceInYears: string;

  @IsOptional()
  rank: string;

  @IsOptional()
  @IsString({ each: true })
  specializations: string;

  @IsOptional()
  tags: string;

  @IsOptional()
  services: string;
}

export class ExpertUdpateDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Lenght must be at least 1 character' })
  @MaxLength(20, { message: 'Length cannnot be over 50 characters' })
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Lenght must be at least 1 character' })
  @MaxLength(50, { message: 'Length cannnot be over 50 characters' })
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Lenght must be at least 1 character' })
  @MaxLength(50, { message: 'Length cannnot be over 50 characters' })
  middleName: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  experienceInYears: string;

  @IsOptional()
  rank: string;

  @IsOptional()
  @IsString({ each: true })
  specializations: string;

  @IsOptional()
  tags: string;

  @IsOptional()
  services: string;
}
