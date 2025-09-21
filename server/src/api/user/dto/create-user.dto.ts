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
	@IsString()
	@IsEmail({ host_whitelist: ['gmail.com'] })
	email: string;

	@ApiProperty({ example: 'username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ example: 'password' })
	@IsString()
	@MinLength(6)
	@IsOptional()
	password?: string;
}
