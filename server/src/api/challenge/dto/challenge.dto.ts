import { ChallengeFrequency } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ChallengeDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	userId: string;

	@ApiProperty({ example: 'Test Challenge' })
	title: string;

	@ApiProperty({ example: 'Test Challenge Description' })
	description: string;

	@ApiProperty({ example: 'WEEKLY', enum: ChallengeFrequency })
	frequency: ChallengeFrequency;

	@ApiProperty({ example: false })
	isStarted: boolean;

	@ApiProperty({ example: false })
	isCompleted: boolean;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	startDate: Date;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	endDate: Date;
}
