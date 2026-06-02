import { ItemRarity, ProfileItemType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class ItemEntityDto extends DefaultFieldsDto {
	@Expose() type: ProfileItemType;
	@Expose() isExclusive: boolean;
	@Expose() isAnimated: boolean;
	@Expose() basePrice: number;
	@Expose() rarity: ItemRarity;
	@Expose() mediaUrl: string;
	@Expose() previewUrl: string;
}
