import { UserSanctionType } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
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

	@ApiProperty({ enum: UserSanctionType, enumName: 'UserSanctionType' })
	@IsEnum(UserSanctionType)
	type: UserSanctionType;
}
