import { NotificationModule } from '@api/notification/notification.module';
import { Module } from '@nestjs/common';
import { WeeklySummaryCronService } from './weekly-summary-cron.service';
import { WeeklySummaryController } from './weekly-summary.controller';
import { WeeklySummaryService } from './weekly-summary.service';

@Module({
	controllers: [WeeklySummaryController],
	providers: [WeeklySummaryService, WeeklySummaryCronService],
	imports: [NotificationModule],
	exports: [WeeklySummaryService],
})
export class WeeklySummaryModule {}
