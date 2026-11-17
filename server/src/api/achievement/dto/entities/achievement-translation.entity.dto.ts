import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class AchievementEntityTranslationDto extends DefaultFieldsDto {
	/**
	 * ISO 639-1 language code (e.g., 'en', 'es', 'fr').
	 * @example en
	 */
	@Expose() language: string;
	@Expose() title: string;
	@Expose() description: string;
	@Expose() achievementId: string;
}
