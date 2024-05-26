import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpertService } from './expert.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ExpertDto, ExpertUdpateDto } from './dto/expert.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uuid } from 'uuidv4';

@Controller('expert')
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Get()
  async getAll() {
    return this.expertService.getAll();
  }

  @Get('/:id')
  async getOneById(@Param('id') id: string) {
    return this.expertService.getOneById(Number(id));
  }

  @Get('/slug/:slug')
  async getOneBySlug(@Param('slug') slug: string) {
    return this.expertService.getOneBySlug(slug);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './static/experts/',
        filename: (req, file, cb) => {
          const filename: string = uuid();
          const extension = (file.originalname.match(/\.+[\S]+$/) || [])[0];

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async create(
    @Body() dto: ExpertDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    photo?: Express.Multer.File,
  ) {
    return this.expertService.create(dto, photo);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './static/experts/',
        filename: (req, file, cb) => {
          const filename: string = uuid();
          const extension = (file.originalname.match(/\.+[\S]+$/) || [])[0];

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async update(@Body() dto: ExpertUdpateDto, @Param('id') id: string, @UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      fileIsRequired: false,
    }),
  )
  photo?: Express.Multer.File,) {
    return this.expertService.update(dto, Number(id), photo);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/assign-dates/:id')
  async assignDates(@Body() body: string[], @Param('id') id: string) {
    return this.expertService.assignDates(body, Number(id));
  }

  @Auth()
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.expertService.delete(Number(id));
  }
}
