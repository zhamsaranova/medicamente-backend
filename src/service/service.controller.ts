import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceDto, UpdateServiceDto } from './dto/service.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uuid } from 'uuidv4';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getAll() {
    return this.serviceService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.serviceService.getById(Number(id));
  }

  @Get('/slug/:slug')
  async getOneBySlug(@Param('slug') slug: string) {
    return this.serviceService.getOneBySlug(slug);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'icon',
          maxCount: 1,
        },
        {
          name: 'bannerImage',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: './static/services/',
          filename: (req, file, cb) => {
            const filename: string = uuid();
            const extension = (file.originalname.match(/\.+[\S]+$/) || [])[0];

            cb(null, `${filename}${extension}`);
          },
        }),
      },
    ),
  )
  async create(
    @Body() dto: ServiceDto,
    @UploadedFiles(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false,
      }),
    )
    files: {
      icon?: Express.Multer.File[];
      bannerImage?: Express.Multer.File[];
    },
  ) {
    return this.serviceService.create(dto, files?.icon, files?.bannerImage);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'icon',
          maxCount: 1,
        },
        {
          name: 'bannerImage',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: './static/services/',
          filename: (req, file, cb) => {
            const filename: string = uuid();
            const extension = (file.originalname.match(/\.+[\S]+$/) || [])[0];

            cb(null, `${filename}${extension}`);
          },
        }),
      },
    ),
  )
  async update(
    @Body() dto: UpdateServiceDto,
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    files: {
      icon?: Express.Multer.File[];
      bannerImage?: Express.Multer.File[];
    },
  ) {
    return this.serviceService.update(
      dto,
      Number(id),
      files?.icon,
      files?.bannerImage,
    );
  }

  @Auth()
  @Put('publish/:id')
  async publish(@Param('id') id: string) {
    return this.serviceService.publish(Number(id));
  }

  @Auth()
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.serviceService.delete(Number(id));
  }
}
