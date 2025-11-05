import { ApiProperty } from '@nestjs/swagger';
import { ReportStatus, ReportType } from '@prisma/client';

export class ReportDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'Test Report' })
	title: string;

	@ApiProperty({ example: 'Test Report Description' })
	description: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	reporterId: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	targetUserId?: string;

	@ApiProperty({ example: 'Test Report Response' })
	response?: string;

	@ApiProperty({ example: ReportStatus.IN_PROGRESS, enum: ReportStatus })
	status: ReportStatus;

	@ApiProperty({ example: ReportType.USER, enum: ReportType })
	reportType: ReportType;
}
