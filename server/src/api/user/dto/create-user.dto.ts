import { IsPassword } from '@libs/validators/is-password.validator';
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateUserDto {
	@IsString({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@IsString({ message: 'Username is required' })
	@IsNotEmpty()
	username: string;

	@IsOptional()
	@IsPassword()
	password?: string;

	@IsBoolean()
	@IsOptional()
	emailVerified?: boolean;
}
