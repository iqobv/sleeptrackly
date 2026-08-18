import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationProcessor } from './processors/notification.processor';
import { NotificationPublisherService } from './services/notification-publisher.service';
import { NotificationService } from './services/notification.service';

@Module({
	imports: [
		BullModule.registerQueue({
			name: QUEUE_NAME.NOTIFICATIONS,
		}),
	],
	controllers: [NotificationController],
	providers: [
		NotificationService,
		NotificationPublisherService,
		NotificationProcessor,
	],
	exports: [NotificationService, NotificationPublisherService],
})
export class NotificationModule {}
