import { ApiProperty } from '@nestjs/swagger';
import { TranslationDto } from 'src/libs/dto';

export class PurchaseHistoryDto {
	@ApiProperty({ example: 'fb80e572-eb40-4156-acce-59a90429cdf6' })
	id: string;

	@ApiProperty({ example: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789' })
	userId: string;

	@ApiProperty({ example: 'd4c3b2a1-6f5e-9874-dcba-210fedcba987' })
	productId: string;

	@ApiProperty({ example: 'e1f2g3h4-i5j6-4789-klmn-op0123456789' })
	transactionId: string;

	@ApiProperty({ example: 1000 })
	pricePaid: number;

	@ApiProperty({ example: 1000 })
	priceSnapshot: number;

	@ApiProperty({ type: [TranslationDto] })
	nameSnapshot: TranslationDto[];

	@ApiProperty({ example: new Date() })
	createdAt: Date;
}
