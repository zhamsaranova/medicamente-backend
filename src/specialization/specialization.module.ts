import { Module } from '@nestjs/common';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SpecializationController],
  providers: [SpecializationService, PrismaService],
})
export class SpecializationModule {}
