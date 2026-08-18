import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ChallengePayloadDto } from '../dto/challenge-payload.dto';

@Injectable()
export class ChallengePublisherService {
	constructor(
		@InjectQueue(QUEUE_NAME.CHALLENGES) private readonly queue: Queue,
	) {}

	public async dispatchProgressCheck(
		payload: ChallengePayloadDto,
	): Promise<void> {
		await this.queue.add(QUEUE_JOB_NAME.CHALLENGES.PROCCESS, payload);
	}
}
