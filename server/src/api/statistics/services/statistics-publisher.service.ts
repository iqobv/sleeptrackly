import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { StatisticsQueuePayloadDto } from '../dto/statistics-queue-payload.dto';

@Injectable()
export class StatisticsPublisherService {
	constructor(
		@InjectQueue(QUEUE_NAME.STATISTICS) private readonly queue: Queue,
	) {}

	public async dispatchStatisticsProcessing(
		payload: StatisticsQueuePayloadDto,
	): Promise<void> {
		const { type, data } = payload;

		const jobId = data.date
			? `stats-${type}-${data.userId}-${data.date}`
			: `stats-${type}-${data.userId}`;

		await this.queue.add(QUEUE_JOB_NAME.STATISTICS.PROCCESS, payload, {
			delay: 2 * 60 * 1000,
			removeOnFail: false,
			removeOnComplete: true,
			jobId,
		});
	}
}
