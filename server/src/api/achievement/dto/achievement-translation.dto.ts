import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { IntersectionType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class AchievementTranslationDto {
	/**
	 * ISO 639-1 language code (e.g., 'en', 'es', 'fr').
	 * @example en
	 */
	@Expose()
	@IsString()
	language: string;

	@Expose()
	@IsString()
	@MinLength(2)
	title: string;

	@Expose()
	@IsString()
	@MinLength(2)
	description: string;
}

export class FullAchievementTranslationDto extends IntersectionType(
	DefaultFieldsDto,
	AchievementTranslationDto,
) {
	@Expose() achievementId: string;
}
