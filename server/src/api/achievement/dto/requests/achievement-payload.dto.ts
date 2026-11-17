import { AchievementType, Platform } from '@generated/prisma/enums';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class AchievementPayloadDto {
	@IsUUID('4') userId: string;
	@IsEnum(AchievementType) type: AchievementType;

	@IsEnum(Platform)
	@IsOptional()
	platform?: Platform;
}
