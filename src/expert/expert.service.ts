import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExpertDto, ExpertUdpateDto } from './dto/expert.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpertService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ExpertDto, photo: Express.Multer.File) {
    const isExists = await this.prisma.expert.findUnique({
      where: { slug: dto.slug },
    });

    if (isExists)
      throw new BadRequestException('Expert with same slug already exists');

    return this.prisma.expert.create({
      data: {
        ...dto,
        experienceInYears: Number(dto.experienceInYears),
        rank: Number(dto.rank),
        photo: photo ? photo.filename : null,
        specializations: {
          connect: JSON.parse(dto.specializations).map((item) => {
            return { id: Number(item) };
          }),
        },
        tags: JSON.parse(dto.tags),
        services: {
          connect:
            dto.services &&
            JSON.parse(dto.services).map((service) => ({
              id: Number(service),
            })),
        },
      },
    });
  }

  async getAll() {
    return this.prisma.expert.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getOneById(id: number) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    return this.getWholeObject({ where: { id } });
  }

  async getOneBySlug(slug: string) {
    const isExists = await this.prisma.expert.findUnique({ where: { slug } });

    if (!isExists)
      throw new NotFoundException('Not found expert with same slug');

    return this.getWholeObject({ where: { slug } });
  }

  async update(dto: ExpertUdpateDto, id: number, photo?: Express.Multer.File) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    return this.prisma.expert.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        slug: dto.slug,
        photo: photo ? photo.filename : isExists.photo,
        experienceInYears: Number(dto.experienceInYears),
        rank: Number(dto.rank),
        specializations: {
          connect: JSON.parse(dto.specializations).map((item) => {
            return { id: Number(item) };
          }),
        },
        tags: JSON.parse(dto.tags),
        services: {
          connect:
            dto.services &&
            JSON.parse(dto.services).map((service) => ({
              id: Number(service),
            })),
        },
      },
    });
  }

  async assignDates(dates: string[], id: number) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    if (dates.length > 90) {
      dates.slice(-90);
    }

    return this.prisma.expert.update({
      where: { id },
      data: {
        recordDates: dates,
      },
    });
  }

  async delete(id: number) {
    const isExists = await this.prisma.expert.findUnique({ where: { id } });

    if (!isExists) throw new NotFoundException('Not found expert with same id');

    return this.prisma.expert.delete({ where: { id } });
  }

  async getWholeObject(params: { where: Prisma.ExpertWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.expert.findUnique({
      where,
      include: {
        services: true,
        specializations: true,
      },
    });
  }
}
