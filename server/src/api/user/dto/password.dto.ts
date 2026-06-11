import { IsPassword } from '@libs/validators/is-password.validator';
import { IsOptional, IsString } from 'class-validator';

export class PasswordRecoveryDto {
	@IsString()
	@IsOptional()
	oldPassword?: string;

	@IsString({ message: 'New password is required' })
	@IsPassword()
	newPassword: string;
}
