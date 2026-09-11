import { QUEUE_JOB_NAME, QUEUE_NAME } from '@libs/constants/queue.constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { WeeklySummaryPayloadDto } from '../dto/weekly-summary-payload.dto';
import { WeeklySummaryService } from '../services/weekly-summary.service';

@Processor(QUEUE_NAME.WEEKLY_SUMMARY)
export class WeeklySummaryProcessor extends WorkerHost {
	constructor(private readonly weeklySummaryService: WeeklySummaryService) {
		super();
	}

	public async process(job: Job<WeeklySummaryPayloadDto>): Promise<void> {
		const payload = plainToInstance(WeeklySummaryPayloadDto, job.data);

		try {
			await validateOrReject(payload);
		} catch (errors) {
			throw new Error(
				`Validation failed for job ${job.id}: ${JSON.stringify(errors)}`,
			);
		}

		if (job.name === QUEUE_JOB_NAME.WEEKLY_SUMMARY.RECALCULATE) {
			await this.weeklySummaryService.processRecalculation(payload);
		}
	}
}
