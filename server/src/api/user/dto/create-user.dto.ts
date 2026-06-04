import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
	@IsString({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@IsString({ message: 'Username is required' })
	@IsNotEmpty()
	username: string;

	@IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0,
		},
		{
			message:
				'Password is not strong enough. It must contain at least 8 characters, including lowercase, uppercase, and numbers.',
		},
	)
	@IsOptional()
	password?: string;

	@IsBoolean()
	@IsOptional()
	emailVerified?: boolean;
}
