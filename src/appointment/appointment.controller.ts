import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AppointmentCreateDto } from './dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getAll() {
    return this.appointmentService.getAll();
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return this.appointmentService.getOneById(Number(id));
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AppointmentCreateDto) {
    return this.appointmentService.create(dto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.appointmentService.delete(Number(id));
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/confirm/:id')
  async confirm(@Param('id') id: string) {
    return this.appointmentService.confirm(Number(id));
  }
}
