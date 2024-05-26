import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AppointmentCreateDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.appointment.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        expert: true,
      },
    });
  }

  async getOneById(id: number) {
    const isExists = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!isExists)
      throw new BadRequestException('Not found entity with same id');

    return this.prisma.appointment.findUnique({ where: { id } });
  }

  async create(data: AppointmentCreateDto) {
    const isExists = await this.prisma.appointment.findUnique({
      where: {
        date: data.date,
      },
    });

    if (isExists) throw new BadRequestException('This date is already booked');

    return this.prisma.appointment.create({
      data: { ...data, expertId: Number(data.expertId) },
    });
  }

  async delete(id: number) {
    const isExists = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!isExists)
      throw new NotFoundException('Not found appointment with same id');

    return this.prisma.appointment.delete({ where: { id } });
  }

  async confirm(id: number) {
    const isExists = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!isExists) {
      throw new NotFoundException('Not found appointment with same id');
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        confirmed: !isExists.confirmed,
      },
    });
  }
}
