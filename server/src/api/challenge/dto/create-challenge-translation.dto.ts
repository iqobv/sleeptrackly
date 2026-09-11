import { IsString } from 'class-validator';

export class CreateChallengeTranslationDto {
	@IsString() language: string;
	@IsString() title: string;
	@IsString() description: string;
}
