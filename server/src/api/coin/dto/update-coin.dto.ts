import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';

export class UpdateCoinDto {
	@ApiProperty({
		example: 'dbc02854-a5ec-46b9-aba6-b6e6b857c59d',
	})
	@IsUUID('4')
	userId: string;

	@ApiProperty({
		example: 0,
	})
	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
		maxDecimalPlaces: 0,
	})
	@Min(0)
	amount: number;
}
