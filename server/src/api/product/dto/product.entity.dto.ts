import { ProductType, ProfileItemType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class ProductEntityDto extends DefaultFieldsDto {
	@Expose() type: ProductType;
	@Expose() itemType: ProfileItemType | null;
	@Expose() bundleId: string | null;
	@Expose() itemId: string | null;
	@Expose() isNew: boolean;
	@Expose() isPopular: boolean;
	@Expose() isExclusive: boolean;
	@Expose() isShowInStore: boolean;
	@Expose() isLimited: boolean;
	@Expose() price: number;
	@Expose() discountedPrice: number | null;
	@Expose() maxStock: number | null;
	@Expose() soldCount: number;
	@Expose() expiresAt: Date | null;
}
