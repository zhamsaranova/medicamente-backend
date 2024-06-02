import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpecializationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpecializationDto: CreateSpecializationDto) {
    const isExists = await this.prisma.specialization.findUnique({
      where: { name: createSpecializationDto.name },
    });

    if (isExists) {
      throw new BadRequestException(
        'Specialization with the same name already exists',
      );
    }

    return this.prisma.specialization.create({
      data: {
        name: createSpecializationDto.name,
        experts: {
          connect:
            createSpecializationDto.experts &&
            createSpecializationDto.experts.map((item) => {
              return { id: Number(item) };
            }),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.specialization.findMany({
      include: {
        experts: {
          include: {
            appointments: true,
          },
        },
      },
    });
  }

  async getOneById(id: number) {
    return this.prisma.specialization.findUnique({
      where: { id },
      include: { experts: true },
    });
  }

  async update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    const isExists = await this.prisma.specialization.findUnique({
      where: { name: updateSpecializationDto.name },
    });

    if (isExists && updateSpecializationDto.name !== isExists.name) {
      throw new BadRequestException(
        'Specialization with the same name already exists',
      );
    }

    return this.prisma.specialization.update({
      where: { id },
      data: {
        name: updateSpecializationDto.name,
        experts: {
          connect:
            updateSpecializationDto.experts &&
            updateSpecializationDto.experts.map((item) => {
              return { id: Number(item) };
            }),
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.specialization.delete({ where: { id } });
  }
}
