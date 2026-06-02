import { DefaultFieldsDto } from '@libs/dto';
import { IntersectionType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CollectionTranslationEntityDto {
	@Expose() language: string;
	@Expose() name: string;
}

export class CollectionTranslationDto extends CollectionTranslationEntityDto {}

export class FullCollectionTranslationDto extends IntersectionType(
	CollectionTranslationEntityDto,
	DefaultFieldsDto,
) {}
