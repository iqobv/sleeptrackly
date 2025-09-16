import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: '2Ct8e@example.com' })
	email: string;

	@ApiProperty({ example: 'John' })
	firstName: string;

	@ApiProperty({ example: 'Doe' })
	lastName: string;

	@ApiProperty({ example: 'USER' })
	role: string;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	createdAt: Date;
}
