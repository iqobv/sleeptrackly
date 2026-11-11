import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { StatisticsProcessor } from './processors/statistics.processor';
import { StatisticsPublisherService } from './services/statistics-publisher.service';
import { StatisticsService } from './services/statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
	imports: [
		BullModule.registerQueue({
			name: QUEUE_NAME.STATISTICS,
		}),
	],
	controllers: [StatisticsController],
	providers: [
		StatisticsService,
		StatisticsPublisherService,
		StatisticsProcessor,
	],
	exports: [StatisticsPublisherService],
})
export class StatisticsModule {}
