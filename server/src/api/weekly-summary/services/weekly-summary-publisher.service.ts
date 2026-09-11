import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { WeeklySummaryPayloadDto } from '../dto/weekly-summary-payload.dto';

@Injectable()
export class WeeklySummaryPublisherService {
	constructor(
		@InjectQueue(QUEUE_NAME.WEEKLY_SUMMARY) private readonly queue: Queue,
	) {}

	public async dispatchRecalculation(
		dto: WeeklySummaryPayloadDto,
	): Promise<void> {
		await this.queue.add(QUEUE_JOB_NAME.WEEKLY_SUMMARY.RECALCULATE, dto);
	}
}
