import { ChallengeTaskStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ChallengeTaskEntityDto extends DefaultFieldsDto {
	@Expose() userChallengeId: string;
	@Expose() date: string;
	@Expose() sleepEntryId: string | null;
	@Expose() completedAt: Date | null;

	@Expose()
	@ApiProperty({ enum: ChallengeTaskStatus, enumName: 'ChallengeTaskStatus' })
	status: ChallengeTaskStatus;
}
