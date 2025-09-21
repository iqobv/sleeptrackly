import { ApiProperty } from '@nestjs/swagger';

export class ChallengeTaskDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	challengeId: string;

	@ApiProperty({ example: 'Test Task Description' })
	description: string;

	@ApiProperty({ example: 10 })
	targetValue: number;

	@ApiProperty({ example: 10 })
	completedValue: number | null;

	@ApiProperty({ example: false })
	isCompleted: boolean;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	startDate: Date;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	endDate: Date;
}
