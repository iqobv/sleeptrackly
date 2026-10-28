import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseStreakDto } from '../../streak/dto/streak.dto';

export class UserStatsEntityDto extends OmitType(DefaultFieldsDto, [
	'createdAt',
	'id',
] as const) {
	@Expose() userId: string;
	@Expose() currentStreakId: string | null;
	@Expose() streakRestores: number;
	@Expose() streakRestoresResetAt: Date;
	@Expose() challengeRestores: number;
	@Expose() challengeRestoresResetAt: Date;

	@Type(() => BaseStreakDto)
	@Expose()
	activeStreak: BaseStreakDto | null;
}
