import { IntersectionType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { DefaultFieldsDto } from './default-fields.dto';

@Exclude()
export class TranslationDto {
	/**
	 * ISO 639-1 language code (e.g., 'en', 'es', 'fr')
	 *
	 * @example en
	 */
	@Expose()
	@IsString()
	@IsNotEmpty()
	language: string;

	@Expose()
	@IsString()
	@IsNotEmpty()
	name: string;
}

export class FullTranslationDto extends IntersectionType(
	TranslationDto,
	DefaultFieldsDto,
) {}
