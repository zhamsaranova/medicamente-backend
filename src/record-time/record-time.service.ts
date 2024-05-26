import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRecordTimeDto } from './dto/create-record-time.dto';
import { UpdateRecordTimeDto } from './dto/update-record-time.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecordTimeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecordTimeDto: CreateRecordTimeDto) {
    const isExists = await this.prisma.recordTime.findUnique({
      where: {
        time: createRecordTimeDto.time,
      },
    });

    if (isExists) throw new BadRequestException('This time is already exists');

    return this.prisma.recordTime.create({
      data: createRecordTimeDto,
    });
  }

  async findAll() {
    return this.prisma.recordTime.findMany({
      orderBy: {
        time: 'asc',
      },
    });
  }

  async update(id: number, updateRecordTimeDto: UpdateRecordTimeDto) {
    const isExistsId = await this.prisma.recordTime.findUnique({
      where: {
        id,
      },
    });

    if (!isExistsId)
      throw new BadRequestException('Time with this id not found');

    const isExistsTime = await this.prisma.recordTime.findUnique({
      where: {
        time: updateRecordTimeDto.time,
      },
    });

    if (isExistsTime)
      throw new BadRequestException('This time is already exists');

    return this.prisma.recordTime.update({
      where: { id },
      data: {
        time: updateRecordTimeDto.time,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.recordTime.delete({
      where: { id },
    });
  }
}
