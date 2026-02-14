import { ApiProperty } from '@nestjs/swagger';

export class CoinDto {
	@ApiProperty({
		example: 'dbc02854-a5ec-46b9-aba6-b6e6b857c59d',
	})
	id: string;

	@ApiProperty({
		example: 1000,
	})
	amount: number;

	@ApiProperty({
		example: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		example: new Date(),
	})
	updatedAt: Date;
}
