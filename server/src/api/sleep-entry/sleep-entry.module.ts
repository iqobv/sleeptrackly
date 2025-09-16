import { Module } from '@nestjs/common';
import { SleepEntryService } from './sleep-entry.service';
import { SleepEntryController } from './sleep-entry.controller';

@Module({
  controllers: [SleepEntryController],
  providers: [SleepEntryService],
})
export class SleepEntryModule {}
