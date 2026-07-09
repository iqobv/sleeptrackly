import { WeeklySummaryModule } from '@api/weekly-summary/weekly-summary.module';
import { Module } from '@nestjs/common';
import { SleepEntryController } from './sleep-entry.controller';
import { SleepEntryService } from './sleep-entry.service';

@Module({
	controllers: [SleepEntryController],
	imports: [WeeklySummaryModule],
	exports: [SleepEntryService],
	providers: [SleepEntryService],
})
export class SleepEntryModule {}
