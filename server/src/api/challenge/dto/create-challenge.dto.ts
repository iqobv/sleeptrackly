import { ChallengeFrequency } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEnum,
	IsNotEmpty,
	IsObject,
	IsString,
	MinLength,
} from 'class-validator';
import { TaskOptionsDto } from './task-options.dto';

export class CreateChallengeDto {
	@ApiProperty({ example: 'Test Challenge' })
	@IsString()
	@IsNotEmpty({ message: 'Title is required' })
	@MinLength(3, { message: 'Title must be at least 3 characters long' })
	title: string;

	@ApiProperty({ example: 'Test Challenge Description' })
	@IsString()
	@IsNotEmpty({ message: 'Description is required' })
	@MinLength(3, { message: 'Description must be at least 3 characters long' })
	description: string;

	@ApiProperty({ example: 'WEEKLY', enum: ChallengeFrequency })
	@IsString()
	@IsEnum(ChallengeFrequency, { message: 'Frequency is invalid' })
	frequency: ChallengeFrequency;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	@IsDateString()
	startDate: Date;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	@IsDateString()
	endDate: Date;

	@ApiProperty({ type: TaskOptionsDto })
	@IsObject()
	tasksOptions: TaskOptionsDto;
}
