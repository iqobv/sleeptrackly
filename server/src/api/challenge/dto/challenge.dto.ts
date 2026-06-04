import { ChallengeTaskDto } from '@api/challenge-task/dto';
import { ChallengeFrequency } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ChallengeDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() title: string;
	@Expose() description: string;

	@Expose()
	@ApiProperty({ enum: ChallengeFrequency, enumName: 'ChallengeFrequency' })
	frequency: ChallengeFrequency;

	@Expose() isStarted: boolean;
	@Expose() isCompleted: boolean;
	@Expose() startDate: Date;
	@Expose() endDate: Date;
	@Expose() deletedAt: Date | null;
}

export class ChallengeFullDto extends ChallengeDto {
	@Expose()
	@Type(() => ChallengeTaskDto)
	tasks: ChallengeTaskDto[];
}
