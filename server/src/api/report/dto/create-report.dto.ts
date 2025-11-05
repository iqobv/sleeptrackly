import { ApiProperty } from '@nestjs/swagger';
import { ReportType } from '@prisma/client';
import {
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	MinLength,
} from 'class-validator';

export class CreateReportDto {
	@ApiProperty({ example: 'Test Report' })
	@IsString({ message: 'Title is required' })
	@MinLength(3, { message: 'Title must be at least 3 characters long' })
	title: string;

	@ApiProperty({ example: 'Test Report Description' })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ example: ReportType.USER, enum: ReportType })
	@IsEnum(ReportType, {
		message: `Report type is invalid. Allowed values: ${Object.values(ReportType).join(', ')}`,
	})
	reportType: ReportType;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	@IsUUID('4', { message: 'Reported id is invalid' })
	@IsOptional()
	reportedId?: string;
}
