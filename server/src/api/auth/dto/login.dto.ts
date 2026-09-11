import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@IsString({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@IsString({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	password: string;
}
