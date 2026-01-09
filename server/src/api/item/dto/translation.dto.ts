import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TranslationDto {
	@ApiProperty({ example: 'Cool Avatar Frame' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'en' })
	@IsString()
	language: string;
}
