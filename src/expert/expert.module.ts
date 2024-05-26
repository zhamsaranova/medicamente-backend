import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertController } from './expert.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExpertController],
  providers: [ExpertService, PrismaService],
})
export class ExpertModule {}
