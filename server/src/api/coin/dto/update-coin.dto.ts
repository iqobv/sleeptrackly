import { IsNumber, IsUUID, Min } from 'class-validator';

export class UpdateCoinDto {
	@IsUUID('4')
	userId: string;

	@IsNumber({
		allowInfinity: false,
		allowNaN: false,
		maxDecimalPlaces: 0,
	})
	@Min(0)
	amount: number;
}
