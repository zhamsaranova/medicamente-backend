import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordTimeDto } from './create-record-time.dto';

export class UpdateRecordTimeDto extends PartialType(CreateRecordTimeDto) {}
