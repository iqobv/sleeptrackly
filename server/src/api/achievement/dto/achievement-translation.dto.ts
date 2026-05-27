import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AchievementTranslationDto {
	@ApiProperty({ example: 'en' })
	@IsString()
	language: string;

	@ApiProperty({ example: 'Achievement Title' })
	@IsString()
	title: string;

	@ApiProperty({ example: 'Achievement Description' })
	@IsString()
	description: string;
}

export class FullAchievementTranslationDto extends IntersectionType(
	DefaultFieldsDto,
	AchievementTranslationDto,
) {
	@ApiProperty({ example: '00478b8d-b42d-4570-82c8-6f0828e7ec21' })
	achievementId: string;
}
