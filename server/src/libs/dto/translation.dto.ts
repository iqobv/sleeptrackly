import { ApiProperty } from '@nestjs/swagger';

export class TranslationDto {
	@ApiProperty({ example: 'en' })
	language: string;

	@ApiProperty({ example: 'Example Name' })
	name: string;
}
