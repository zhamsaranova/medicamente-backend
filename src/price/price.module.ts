import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PriceController],
  providers: [PriceService, PrismaService],
})
export class PriceModule {}
