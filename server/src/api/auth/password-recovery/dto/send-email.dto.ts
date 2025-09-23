import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
	@ApiProperty({ example: 'email@example.com' })
	@IsString({ message: 'Email is required' })
	@IsEmail(
		{ host_whitelist: ['gmail.com'] },
		{ message: 'Email is invalid. Allowed domains: gmail.com' },
	)
	email: string;
}
