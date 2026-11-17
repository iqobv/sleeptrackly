import { FullProductDto } from '@api/product/dto/product.dto';
import { AchievementType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FullAchievementTranslationDto } from '../responses/achievement-translation.dto';

export class AchievementEntityDto extends DefaultFieldsDto {
	@Expose()
	@ApiProperty({ enum: AchievementType, enumName: 'AchievementType' })
	type: AchievementType;

	@Expose() targetValue: number;
	@Expose() iconUrl: string;
	@Expose() isActive: boolean;
	@Expose() isHidden: boolean;
	@Expose() rewardCoins: number;
	@Expose() rewardProductId: string | null;

	@Expose()
	@Type(() => FullAchievementTranslationDto)
	translations: FullAchievementTranslationDto[];

	@Expose()
	@Type(() => FullProductDto)
	rewardProduct: FullProductDto | null;
}
