import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ServiceDto {
  @IsString()
  name: string;

  @IsString()
  shortDescription: string;

  @IsString()
  longDescription: string;

  @IsString()
  slug: string;

  @IsOptional()
  prices: string;

  @IsOptional()
  specialists: string;

  @IsOptional()
  bannerText: string;
}

export class UpdateServiceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription: string;

  @IsString()
  slug: string;

  @IsOptional()
  prices: string;

  @IsOptional()
  specialists: string;

  @IsOptional()
  bannerText: string;
}
