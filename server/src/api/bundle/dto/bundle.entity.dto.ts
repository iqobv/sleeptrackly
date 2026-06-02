import { DefaultFieldsDto } from '@libs/dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BundleEntityDto extends DefaultFieldsDto {
	@Expose() basePrice: number;
	@Expose() isExclusive: boolean;
	@Expose() discountPercentage: number;
	@Expose() mediaUrl: string;
}

@Exclude()
export class BundleItemEntityDto {
	@Expose() itemId: string;
	@Expose() bundleId: string;
}
