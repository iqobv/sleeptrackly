import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PurchaseHistoryEntityDto extends OmitType(DefaultFieldsDto, [
	'updatedAt',
] as const) {
	@Expose() userId: string | null;
	@Expose() productId: string | null;
	@Expose() transactionId: string | null;
	@Expose() pricePaid: number;
	@Expose() priceSnapshot: number;
}
