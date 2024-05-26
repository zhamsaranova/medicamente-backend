import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecordTimeService } from './record-time.service';
import { CreateRecordTimeDto } from './dto/create-record-time.dto';
import { UpdateRecordTimeDto } from './dto/update-record-time.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('record-time')
export class RecordTimeController {
  constructor(private readonly recordTimeService: RecordTimeService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createRecordTimeDto: CreateRecordTimeDto) {
    return this.recordTimeService.create(createRecordTimeDto);
  }

  @Get()
  findAll() {
    return this.recordTimeService.findAll();
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecordTimeDto: UpdateRecordTimeDto,
  ) {
    return this.recordTimeService.update(+id, updateRecordTimeDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordTimeService.remove(+id);
  }
}
