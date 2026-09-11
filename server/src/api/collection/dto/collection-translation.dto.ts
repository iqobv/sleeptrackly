import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { IntersectionType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CollectionTranslationEntityDto {
	@Expose()
	@IsString()
	@MinLength(2)
	language: string;

	@Expose()
	@IsString()
	@MinLength(2)
	name: string;
}

export class CollectionTranslationDto extends CollectionTranslationEntityDto {}

export class FullCollectionTranslationDto extends IntersectionType(
	CollectionTranslationEntityDto,
	DefaultFieldsDto,
) {}
