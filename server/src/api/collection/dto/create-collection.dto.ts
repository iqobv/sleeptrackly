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
	@ApiProperty({ example: 'example-collection' })
	@IsString()
	@MinLength(4)
	slug: string;

	@ApiProperty({ example: true })
	@TransformBoolean()
	@IsBoolean()
	showInStore: boolean;

	@ApiProperty({ type: [CollectionTranslationDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CollectionTranslationDto)
	@TransformTranslations(CollectionTranslationDto)
	translations: CollectionTranslationDto[];

	@ApiProperty({ example: ['item-uuid-1', 'item-uuid-2'] })
	@TransformArray()
	@IsArray()
	@IsUUID('4', { each: true })
	productIds: string[];

	@ApiProperty({ example: '#ff0000' })
	@IsHexColor()
	accentColor: string;
}

export class CreateCollectionSwaggerDto extends CreateCollectionDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	icon: Express.Multer.File;
}
