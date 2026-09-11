import { IsOptional, IsString } from 'class-validator';

export class LanguageQueryDto {
	/**
	 * Optional ISO 639-1 language code (e.g., 'en', 'es', 'fr'). Defaults to 'en' if not provided.
	 *
	 * @example en
	 */
	@IsOptional()
	@IsString()
	language?: string = 'en';
}
