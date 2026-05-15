import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
	@ApiProperty({ example: 'email@example.com' })
	@IsString({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: 'password' })
	@IsString({ message: 'Password is required' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	password: string;
}
