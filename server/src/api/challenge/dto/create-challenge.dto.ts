import { ChallengeFrequency } from '@prisma/client';
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
	@IsNotEmpty()
	@MinLength(3)
	title: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	description: string;

	@IsString()
	@IsEnum(ChallengeFrequency)
	frequency: ChallengeFrequency;

	@IsDateString()
	startDate: Date;

	@IsDateString()
	endDate: Date;

	@IsObject()
	tasksOptions: TaskOptionsDto;
}
