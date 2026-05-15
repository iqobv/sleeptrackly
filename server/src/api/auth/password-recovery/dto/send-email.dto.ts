import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
	@ApiProperty({ example: 'email@example.com' })
	@IsString({ message: 'Email is required' })
	@IsEmail()
	email: string;
}
