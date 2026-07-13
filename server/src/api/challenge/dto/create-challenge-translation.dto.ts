import { IsOptional, IsString } from 'class-validator';

export class CreateChallengeTranslationDto {
	@IsString() language: string;
	@IsString() title: string;

	@IsOptional()
	@IsString()
	description?: string;
}
