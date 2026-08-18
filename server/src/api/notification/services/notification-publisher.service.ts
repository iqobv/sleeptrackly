import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { CreateDirectPushDto } from '../dto/create-direct-push.dto';

@Injectable()
export class NotificationPublisherService {
	constructor(
		@InjectQueue(QUEUE_NAME.NOTIFICATIONS) private readonly queue: Queue,
	) {}

	public async dispatchCreate(dto: CreateNotificationDto): Promise<void> {
		await this.queue.add(QUEUE_JOB_NAME.NOTIFICATIONS.CREATE, dto);
	}

	public async dispatchDirectPush(dto: CreateDirectPushDto): Promise<void> {
		await this.queue.add(QUEUE_JOB_NAME.NOTIFICATIONS.DIRECT_PUSH, dto);
	}
}
