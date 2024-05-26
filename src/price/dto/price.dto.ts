import { IsNumber, IsOptional, IsString } from "class-validator";

export class PriceCreateDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    oldPrice: number
}

export class PriceUpdateDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    oldPrice: number
}