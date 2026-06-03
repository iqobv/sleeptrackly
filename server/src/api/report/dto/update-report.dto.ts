import { ReportStatus } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
	@ApiProperty({ enum: ReportStatus, enumName: 'ReportStatus' })
	@IsEnum(ReportStatus, { message: 'Status is invalid' })
	@IsOptional()
	status?: ReportStatus;

	@IsOptional()
	@IsString()
	response?: string;
}
