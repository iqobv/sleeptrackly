import { IsString, MinLength } from 'class-validator';

export class CreateAchievementTranslationDto {
	/**
	 * ISO 639-1 language code (e.g., 'en', 'es', 'fr').
	 * @example en
	 */
	@IsString()
	language: string;

	@IsString()
	@MinLength(2)
	title: string;

	@IsString()
	@MinLength(2)
	description: string;
}
