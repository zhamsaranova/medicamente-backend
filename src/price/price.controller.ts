import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PriceCreateDto, PriceUpdateDto } from './dto/price.dto';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async getAll() {
    return this.priceService.getAll();
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return this.priceService.getOneById(Number(id));
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: PriceCreateDto) {
    return this.priceService.create(dto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async update(@Body() dto: PriceUpdateDto, @Param('id') id: string) {
    return this.priceService.update(dto, Number(id));
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.priceService.delete(Number(id));
  }
}
