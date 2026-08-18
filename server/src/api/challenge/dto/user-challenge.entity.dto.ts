import { ChallengeStatus, ChallengeTaskStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ChallengeTaskEntityDto extends DefaultFieldsDto {
	@Expose() userChallengeId: string;
	@Expose() date: string;
	@Expose() sleepEntryId: string | null;
	@Expose() completedAt: Date | null;

	@Expose()
	@ApiProperty({ enum: ChallengeTaskStatus, enumName: 'ChallengeTaskStatus' })
	status: ChallengeTaskStatus;
}

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
