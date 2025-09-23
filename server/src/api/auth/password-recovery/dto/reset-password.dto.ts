import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
	@ApiProperty({ example: 'a81bc81bdead4e5dabff90865d1e13b1' })
	@IsString({ message: 'Token is required' })
	@IsNotEmpty({ message: 'Token is required' })
	token: string;

	@ApiProperty({ example: 'password' })
	@IsString({ message: 'Password is required' })
	@IsNotEmpty({ message: 'Token is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password: string;
}
