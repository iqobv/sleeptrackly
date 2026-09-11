import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AchievementPayloadDto } from '../dto/achievement-payload.dto';
import { AchievementProgressService } from '../services/achievement-progress.service';

@Processor(QUEUE_NAME.ACHIEVEMENTS)
export class AchievementsProcessor extends WorkerHost {
	constructor(
		private readonly achievementProgressService: AchievementProgressService,
	) {
		super();
	}

	public async process(job: Job): Promise<void> {
		const payload = plainToInstance(AchievementPayloadDto, job.data);

		try {
			await validateOrReject(payload);
		} catch (errors) {
			throw new Error(
				`Validation failed for job ${job.id}: ${JSON.stringify(errors)}`,
			);
		}

		await this.achievementProgressService.checkProgress(
			payload.userId,
			payload.type,
		);
	}
}
