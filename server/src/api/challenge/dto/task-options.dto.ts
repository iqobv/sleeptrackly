import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class TaskOptionsDto {
	@IsNumber()
	@Min(0)
	increment: number;

	@IsNumber()
	@Min(0)
	value: number;

	@IsString()
	@IsNotEmpty()
	description: string;
}
