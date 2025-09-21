import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class TaskOptionsDto {
	@ApiProperty({ example: 10 })
	@IsNumber()
	@Min(0)
	increment: number;

	@ApiProperty({ example: 10 })
	@IsNumber()
	@Min(0)
	value: number;

	@ApiProperty({ example: 'Test Task Description' })
	@IsString()
	@IsNotEmpty()
	description: string;
}
