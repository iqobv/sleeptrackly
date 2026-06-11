import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class ChallengeTaskDto extends DefaultFieldsDto {
	@Expose() challengeId: string;
	@Expose() description: string;
	@Expose() targetValue: number | null;
	@Expose() completedValue: number | null;
	@Expose() isCompleted: boolean;
	@Expose() startDate: Date;
	@Expose() endDate: Date;
}
