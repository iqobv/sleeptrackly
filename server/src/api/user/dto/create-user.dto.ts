import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsEmail({ host_whitelist: ['gmail.com'] })
	email: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@MinLength(6)
	@IsOptional()
	password?: string;
}
