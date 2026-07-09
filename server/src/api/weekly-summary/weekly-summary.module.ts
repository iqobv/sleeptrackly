import { NotificationModule } from '@api/notification/notification.module';
import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { WeeklySummaryCronService } from './services/weekly-summary-cron.service';
import { WeeklySummaryPublisherService } from './services/weekly-summary-publisher.service';
import { WeeklySummaryService } from './services/weekly-summary.service';
import { WeeklySummaryController } from './weekly-summary.controller';
import { WeeklySummaryWorker } from './workers/weekly-summary.worker';

@Module({
	controllers: [WeeklySummaryController],
	providers: [
		WeeklySummaryService,
		WeeklySummaryCronService,
		WeeklySummaryPublisherService,
		WeeklySummaryWorker,
	],
	imports: [
		NotificationModule,
		BullModule.registerQueue({
			name: QUEUE_NAME.WEEKLY_SUMMARY,
		}),
	],
	exports: [WeeklySummaryPublisherService],
})
export class WeeklySummaryModule {}
