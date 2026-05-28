import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CollectionTranslationDto {
	@ApiProperty({ example: 'en' })
	@IsString()
	language: string;

	@ApiProperty({ example: 'Example Name' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'Example Description' })
	@IsString()
	description: string;
}

export class FullCollectionTranslationDto extends IntersectionType(
	CollectionTranslationDto,
	DefaultFieldsDto,
) {}
