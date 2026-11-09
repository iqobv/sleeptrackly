import { Platform } from '@generated/prisma/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class PlatformDto {
	@IsOptional()
	@IsEnum(Platform)
	platform?: Platform;
}
