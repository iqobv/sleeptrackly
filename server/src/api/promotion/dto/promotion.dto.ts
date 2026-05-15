import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class PromotionDto extends DefaultFieldsDto {
	@ApiProperty({ example: 'alias' })
	alias: string;

	@ApiProperty({ example: 5 })
	maxUses: number;

	@ApiProperty({ example: 0 })
	usedCount: number;

	@ApiProperty({ example: new Date(Date.now() + 86400000) })
	expiresAt: Date;

	@ApiProperty({ example: 0 })
	coinsReward: number;

	@ApiProperty({ example: 'product-id' })
	productIdReward: string;
}
