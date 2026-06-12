import { FullProductDto } from '@api/product/dto/product.dto';
import { AchievementType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { FullAchievementTranslationDto } from './achievement-translation.dto';

@Exclude()
export class AchievementDto extends DefaultFieldsDto {
	@Expose()
	@ApiProperty({ enum: AchievementType, enumName: 'AchievementType' })
	type: AchievementType;

	@Expose() targetValue: number;
	@Expose() iconUrl: string;
	@Expose() isActive: boolean;
	@Expose() isHidden: boolean;
	@Expose() rewardCoins: number;
	@Expose() rewardProductId: string | null;
}

export class FullAchievementDto extends AchievementDto {
	@Expose()
	@Type(() => FullAchievementTranslationDto)
	translations: FullAchievementTranslationDto[];

	@Expose()
	@Type(() => FullProductDto)
	rewardProduct: FullProductDto | null;
}
