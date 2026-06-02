import {
	TransformArray,
	TransformBoolean,
	TransformTranslations,
} from '@libs/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsHexColor,
	IsString,
	IsUUID,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { CollectionTranslationDto } from './collection-translation.dto';

export class CreateCollectionDto {
	@IsString()
	@MinLength(4)
	slug: string;

	@TransformBoolean()
	@IsBoolean()
	showInStore: boolean;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CollectionTranslationDto)
	@TransformTranslations(CollectionTranslationDto)
	translations: CollectionTranslationDto[];

	@TransformArray()
	@IsArray()
	@IsUUID('4', { each: true })
	productIds: string[];

	@IsHexColor()
	accentColor: string;
}

export class CreateCollectionSwaggerDto extends CreateCollectionDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	icon: Express.Multer.File;
}
