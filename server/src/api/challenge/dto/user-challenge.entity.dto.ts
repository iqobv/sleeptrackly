import { ChallengeTaskEntityDto } from '@api/challenge-task/dto/challenge-task.entity.dto';
import { ChallengeStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose, Type } from 'class-transformer';

export class UserChallengeEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() challengeId: string;
	@Expose() status: ChallengeStatus;
	@Expose() progress: number;
	@Expose() usedRecoveries: number;
	@Expose() startDate: string;
	@Expose() endDate: string;

	@Type(() => ChallengeTaskEntityDto)
	@Expose()
	tasks: ChallengeTaskEntityDto[];
}
