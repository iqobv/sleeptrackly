import { IsString } from 'class-validator';

export class CreateUserFcmTokenDto {
	/**
	 * @example fcm_token_1234567890abcdef
	 */
	@IsString()
	token: string;
}
