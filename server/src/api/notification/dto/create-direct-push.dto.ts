import { IsString } from 'class-validator';

export class CreateDirectPushDto {
	@IsString({ each: true })
	tokens: string[];

	@IsString()
	title: string;

	@IsString()
	body: string;

	@IsString()
	redirectUrl: string;
}
