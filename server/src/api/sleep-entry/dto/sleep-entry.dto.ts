import { ApiProperty } from '@nestjs/swagger';

export class SleepEntryDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	userId: string;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	sleepStart: Date;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	sleepEnd: Date;

	@ApiProperty({ example: 60 })
	sleepDuration: number;

	@ApiProperty({ example: '2025-01-01' })
	dateForChart: string;

	createdAt: Date;
	updatedAt: Date;
}
