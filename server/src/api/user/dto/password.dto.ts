import { IsOptional, IsString, MinLength } from 'class-validator';

export class PasswordRecoveryDto {
	@IsString()
	@IsOptional()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	oldPassword?: string;

	@IsString({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	newPassword: string;
}
