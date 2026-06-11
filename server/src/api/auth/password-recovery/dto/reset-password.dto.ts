import { IsPassword } from '@libs/validators/is-password.validator';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
	@IsString({ message: 'Token is required' })
	@IsNotEmpty({ message: 'Token is required' })
	token: string;

	@IsString({ message: 'Password is required' })
	@IsPassword()
	password: string;
}
