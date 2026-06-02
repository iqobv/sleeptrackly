import { ReportType } from '@generated/prisma/enums';
import {
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	MinLength,
} from 'class-validator';

export class CreateReportDto {
	@IsString({ message: 'Title is required' })
	@MinLength(3, { message: 'Title must be at least 3 characters long' })
	title: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsEnum(ReportType, {
		message: `Report type is invalid. Allowed values: ${Object.values(ReportType).join(', ')}`,
	})
	reportType: ReportType;

	@IsUUID('4', { message: 'Reported id is invalid' })
	@IsOptional()
	reportedId?: string;
}
