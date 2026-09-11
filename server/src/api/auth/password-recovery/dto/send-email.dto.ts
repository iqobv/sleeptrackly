import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
	@IsString({ message: 'Email is required' })
	@IsEmail()
	email: string;
}
