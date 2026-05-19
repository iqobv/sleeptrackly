import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TranslationDto {
	@ApiProperty({ example: 'en' })
	@IsString()
	@IsNotEmpty()
	language: string;

	@ApiProperty({ example: 'Example Name' })
	@IsString()
	@IsNotEmpty()
	name: string;
}
