import { IsEmail, IsString } from 'class-validator';

export class OAuthUserDto {
	@IsString()
	provider: string;

	@IsString()
	providerId: string;

	@IsEmail()
	email: string;
}
