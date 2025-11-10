import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
	@ApiProperty({ example: ReportStatus.IN_PROGRESS, enum: ReportStatus })
	@IsEnum(ReportStatus, { message: 'Status is invalid' })
	@IsOptional()
	status?: ReportStatus;

	@ApiProperty({ example: 'Test Report Response' })
	@IsOptional()
	@IsString()
	response?: string;
}
