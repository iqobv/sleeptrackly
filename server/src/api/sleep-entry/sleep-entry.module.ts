import { Module } from '@nestjs/common';
import { SleepEntryService } from './sleep-entry.service';
import { SleepEntryController } from './sleep-entry.controller';

@Module({
  controllers: [SleepEntryController],
	exports: [SleepEntryService],
  providers: [SleepEntryService],
})
export class SleepEntryModule {}
