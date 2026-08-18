import { IsString } from 'class-validator';

export class CreateChallengeTemplateTranslationDto {
	@IsString() language: string;
	@IsString() title: string;
	@IsString() description: string;
}
