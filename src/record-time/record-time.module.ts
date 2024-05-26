import { Module } from '@nestjs/common';
import { RecordTimeService } from './record-time.service';
import { RecordTimeController } from './record-time.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecordTimeController],
  providers: [RecordTimeService, PrismaService],
})
export class RecordTimeModule {}
