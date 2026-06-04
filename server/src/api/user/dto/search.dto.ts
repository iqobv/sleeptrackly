import { IsString, MinLength } from 'class-validator';

export class SearchDto {
	@IsString({ message: 'Username is required' })
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	username: string;
}
