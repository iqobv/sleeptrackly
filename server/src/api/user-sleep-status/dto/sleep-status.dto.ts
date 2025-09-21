import { ApiProperty } from '@nestjs/swagger';

export class SleepStatusDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	userId: string;

	@ApiProperty({ example: true })
	isSleeping: boolean;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	sleepStart: Date | null;
}
