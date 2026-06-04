import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class PromotionDto extends DefaultFieldsDto {
	@Expose() alias: string;
	@Expose() maxUses: number | null;
	@Expose() usedCount: number;
	@Expose() expiresAt: Date | null;
	@Expose() coinsReward: number | null;
	@Expose() productIdReward: string | null;
}
