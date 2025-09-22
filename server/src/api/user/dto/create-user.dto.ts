import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'email@example.com' })
	@IsString({ message: 'Email is required' })
	@IsEmail(
		{ host_whitelist: ['gmail.com'] },
		{ message: 'Email is invalid. Allowed domains: gmail.com' },
	)
	email: string;

	@ApiProperty({ example: 'username' })
	@IsString({ message: 'Username is required' })
	@IsNotEmpty()
	username: string;

	@ApiProperty({ example: 'password' })
	@IsString({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@IsOptional()
	password?: string;
}
