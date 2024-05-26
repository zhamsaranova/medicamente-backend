import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PriceCreateDto, PriceUpdateDto } from './dto/price.dto';

@Injectable()
export class PriceService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.price.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getOneById(id: number) {
    const isExists = await this.prisma.price.findUnique({
      where: { id },
    });

    if (!isExists)
      throw new BadRequestException('Not found entity with same id');

    return this.prisma.price.findUnique({ where: { id } });
  }

  async create(data: PriceCreateDto) {
    const isExists = await this.prisma.price.findUnique({
      where: { name: data.name },
    });

    if (isExists) throw new BadRequestException('Found entity with same name');

    return this.prisma.price.create({ data });
  }

  async update(data: PriceUpdateDto, id: number) {
    const isExists = await this.prisma.price.findUnique({
      where: { id },
    });

    if (!isExists) throw new NotFoundException('Not found price with same id');

    const nameIsNotUnique = await this.prisma.price.findUnique({
      where: { name: data.name },
    });

    if (nameIsNotUnique && isExists.name !== nameIsNotUnique.name) {
      throw new BadRequestException('Name should be unique');
    }

    return this.prisma.price.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        oldPrice: data.oldPrice,
      },
    });
  }

  async delete(id: number) {
    const isExists = await this.prisma.price.findUnique({
      where: { id },
    });

    if (!isExists) throw new NotFoundException('Not found price with same id');

    return this.prisma.price.delete({ where: { id } });
  }
}
