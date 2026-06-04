import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationDto {
	@IsString({ message: 'Token is required' })
	@IsNotEmpty({ message: 'Token is required' })
	token: string;
}
