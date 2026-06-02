import { ChallengeFrequency } from '@generated/prisma/enums';
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
	@IsString()
	@IsNotEmpty({ message: 'Title is required' })
	@MinLength(3, { message: 'Title must be at least 3 characters long' })
	title: string;

	@IsString()
	@IsNotEmpty({ message: 'Description is required' })
	@MinLength(3, { message: 'Description must be at least 3 characters long' })
	description: string;

	/** @example DAILY */
	@IsString()
	@IsEnum(ChallengeFrequency, { message: 'Frequency is invalid' })
	frequency: ChallengeFrequency;

	@IsDateString()
	startDate: Date;

	@IsDateString()
	endDate: Date;

	@IsObject()
	tasksOptions: TaskOptionsDto;
}
