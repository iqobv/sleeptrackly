import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsString({ message: 'Email is required' })
	@IsEmail(
		{ host_whitelist: ['gmail.com'] },
		{ message: 'Email is invalid. Allowed domains: gmail.com' },
	)
	email: string;

	@IsString({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string;
}
