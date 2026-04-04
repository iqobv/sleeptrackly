import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { UserSanctionType } from 'generated/prisma/enums';

export class CreaeteUserSanctionDto {
	@ApiProperty({
		example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1',
	})
	@IsUUID('4')
	@IsOptional()
	reportId?: string;

	@ApiProperty({
		example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1',
	})
	@IsUUID('4')
	targetUserId: string;

	@ApiProperty({
		example: '2025-01-01T00:00:00.000Z',
	})
	@IsDateString()
	startsAt: Date;

	@ApiProperty({
		example: '2025-01-01T00:00:00.000Z',
	})
	@IsDateString()
	endsAt: Date;

	@ApiProperty({
		example: UserSanctionType.AVATAR_CHANGE_BAN,
	})
	@IsEnum(UserSanctionType)
	type: UserSanctionType;
}
