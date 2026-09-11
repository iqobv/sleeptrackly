import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { AchievementPayloadDto } from '../dto/achievement-payload.dto';

@Injectable()
export class AchievementsPublisherService {
	constructor(
		@InjectQueue(QUEUE_NAME.ACHIEVEMENTS) private readonly queue: Queue,
	) {}

	public async dispatchProgressCheck(
		payload: AchievementPayloadDto,
	): Promise<void> {
		await this.queue.add(QUEUE_JOB_NAME.ACHIEVEMENTS.PROCCESS, payload);
	}
}
