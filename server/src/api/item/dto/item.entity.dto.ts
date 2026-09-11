import { ItemRarity, ProfileItemType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ItemEntityDto extends DefaultFieldsDto {
	@Expose()
	@ApiProperty({ enum: ProfileItemType, enumName: 'ProfileItemType' })
	type: ProfileItemType;

	@Expose() isExclusive: boolean;
	@Expose() isAnimated: boolean;
	@Expose() basePrice: number;

	@Expose()
	@ApiProperty({ enum: ItemRarity, enumName: 'ItemRarity' })
	rarity: ItemRarity;

	@Expose() mediaUrl: string;
	@Expose() previewUrl: string;
}
