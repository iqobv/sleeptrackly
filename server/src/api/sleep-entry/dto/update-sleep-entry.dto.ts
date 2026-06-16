import { PartialType } from '@nestjs/swagger';
import { CreateSleepEntryDto } from './create-sleep-entry.dto';

export class UpdateSleepEntryDto extends PartialType(CreateSleepEntryDto) {}
