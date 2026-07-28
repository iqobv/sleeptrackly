import { ChallengeTaskEntityDto } from '@api/challenge-task/dto/challenge-task.entity.dto';
import { ChallengeStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserChallengeEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() challengeId: string;

	@Expose()
	@ApiProperty({ enum: ChallengeStatus, enumName: 'ChallengeStatus' })
	status: ChallengeStatus;

	@Expose() progress: number;
	@Expose() usedRecoveries: number;
	@Expose() startDate: string;
	@Expose() endDate: string;
	@Expose() frozenAt: Date | null;
	@Expose() completedAt: Date | null;

	@Type(() => ChallengeTaskEntityDto)
	@Expose()
	tasks: ChallengeTaskEntityDto[];
}
