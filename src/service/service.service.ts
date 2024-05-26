import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.service.findMany({
      include: {
        prices: true,
        specialists: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getById(id: number) {
    const isExists = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.getWholeObject({ where: { id } });
  }

  async getOneBySlug(slug: string) {
    const isExists = await this.prisma.service.findUnique({
      where: { slug },
    });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.getWholeObject({ where: { slug } });
  }

  async create(
    dto: ServiceDto,
    icon?: Express.Multer.File[],
    bannerImage?: Express.Multer.File[],
  ) {
    const isExists = await this.prisma.service.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (isExists) throw new BadRequestException('This name is already in use');

    const slugIsExists = await this.prisma.service.findUnique({
      where: {
        slug: dto.slug,
      },
    });

    if (slugIsExists)
      throw new BadRequestException('This slug is already in use');

    const service = await this.prisma.service.create({
      data: {
        ...dto,
        icon: icon ? icon[0]?.filename : null,
        bannerImage: bannerImage ? bannerImage[0].filename : null,
        prices: {
          connect:
            dto.prices &&
            JSON.parse(dto.prices).map((item) => ({ id: Number(item) })),
        },
        specialists: {
          connect:
            dto.specialists &&
            JSON.parse(dto.specialists).map((item) => ({
              id: Number(item),
            })),
        },
      },
      include: {
        prices: true,
      },
    });
    return service;
  }

  async update(
    dto: UpdateServiceDto,
    id: number,
    icon?: Express.Multer.File[],
    bannerImage?: Express.Multer.File[],
  ) {
    const isExists = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.prisma.service.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        shortDescription: dto.shortDescription,
        longDescription: dto.longDescription,
        icon: icon ? icon[0].filename : isExists.icon,
        bannerImage: bannerImage
          ? bannerImage[0].filename
          : isExists.bannerImage,
        bannerText: dto.bannerText,
        published: false,
        slug: dto.slug,
        prices: {
          connect: JSON.parse(dto.prices).map((item) => ({ id: Number(item) })),
        },
        specialists: {
          connect: JSON.parse(dto.specialists).map((item) => ({
            id: Number(item),
          })),
        },
      },
      include: {
        prices: true,
      },
    });
  }

  async publish(id: number) {
    const isExists = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!isExists) throw new NotFoundException('Cannot get service');

    return this.prisma.service.update({
      where: { id },
      data: {
        published: true,
      },
    });
  }

  async delete(id: number) {
    const service = await this.prisma.service.delete({
      where: { id },
    });

    return { success: true };
  }

  private async getWholeObject(params: {
    where: Prisma.ServiceWhereUniqueInput;
  }) {
    const { where } = params;

    return this.prisma.service.findUnique({
      where,
      include: {
        specialists: true,
        prices: true,
      },
    });
  }
}
