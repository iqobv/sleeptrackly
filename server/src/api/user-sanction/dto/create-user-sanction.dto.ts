import { ApiProperty } from '@nestjs/swagger';
import { UserSanctionType } from '@prisma/client';
import { IsDateString, IsEnum, IsUUID } from 'class-validator';

export class CreaeteUserSanctionDto {
	@ApiProperty({
		example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1',
	})
	@IsUUID('4')
	reportId: string;

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
