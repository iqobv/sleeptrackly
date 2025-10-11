import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SearchDto {
	@ApiProperty({ example: 'username' })
	@IsString({ message: 'Username is required' })
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	username: string;
}
