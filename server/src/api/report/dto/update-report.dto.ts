import { ReportStatus } from '@generated/prisma/enums';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
	@IsEnum(ReportStatus, { message: 'Status is invalid' })
	@IsOptional()
	status?: ReportStatus;

	@IsOptional()
	@IsString()
	response?: string;
}
