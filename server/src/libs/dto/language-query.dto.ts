import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LanguageQueryDto {
	@ApiProperty({
		required: false,
		description: 'Language code for localization',
		example: 'en',
	})
	@IsOptional()
	@IsString()
	language?: string = 'en';
}
