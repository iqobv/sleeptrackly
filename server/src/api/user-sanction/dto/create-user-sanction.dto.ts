import { UserSanctionType } from '@generated/prisma/enums';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreaeteUserSanctionDto {
	@IsUUID('4')
	@IsOptional()
	reportId?: string;

	@IsUUID('4')
	targetUserId: string;

	@IsDateString()
	startsAt: Date;

	@IsDateString()
	endsAt: Date;

	@IsEnum(UserSanctionType)
	type: UserSanctionType;
}
