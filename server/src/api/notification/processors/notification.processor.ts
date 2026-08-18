import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { CreateDirectPushDto } from '../dto/create-direct-push.dto';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationService } from '../services/notification.service';

@Processor(QUEUE_NAME.NOTIFICATIONS)
export class NotificationProcessor extends WorkerHost {
	constructor(private readonly notificationService: NotificationService) {
		super();
	}

	public async process(
		job: Job<CreateNotificationDto | CreateDirectPushDto>,
	): Promise<void> {
		const { name } = job;

		switch (name) {
			case QUEUE_JOB_NAME.NOTIFICATIONS.CREATE:
				await this.notificationService.create(
					job.data as CreateNotificationDto,
				);
				break;
			case QUEUE_JOB_NAME.NOTIFICATIONS.DIRECT_PUSH:
				await this.notificationService.sendDirectPush(
					job.data as CreateDirectPushDto,
				);
				break;
			default:
				throw new Error(`Unknown job name: ${name}`);
		}
	}
}
