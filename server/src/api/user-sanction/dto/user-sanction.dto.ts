import { ApiProperty } from '@nestjs/swagger';
import { UserSanctionType } from 'generated/prisma/enums';

export class UserSanctionDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	userId: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	reportId: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	createdById: string;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	startsAt: Date;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	endsAt: Date;

	@ApiProperty({ example: UserSanctionType.AVATAR_CHANGE_BAN })
	type: string;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	createdAt: Date;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	updatedAt: Date;
}
