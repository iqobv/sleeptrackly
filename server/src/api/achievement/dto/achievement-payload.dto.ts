import { AchievementType } from '@generated/prisma/enums';
import { IsEnum, IsUUID } from 'class-validator';

export class AchievementPayloadDto {
	@IsUUID('4') userId: string;
	@IsEnum(AchievementType) type: AchievementType;
}
