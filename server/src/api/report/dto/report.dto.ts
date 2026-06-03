import { UserDto } from '@api/user/dto';
import { ReportStatus, ReportType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ReportDto extends DefaultFieldsDto {
	@Expose() title: string;
	@Expose() description: string | null;
	@Expose() reporterId: string;
	@Expose() targetUserId: string | null;
	@Expose() reviewedById: string | null;
	@Expose() response: string | null;

	@Expose()
	@ApiProperty({ enum: ReportStatus, enumName: 'ReportStatus' })
	status: ReportStatus;

	@Expose()
	@ApiProperty({ enum: ReportType, enumName: 'ReportType' })
	reportType: ReportType;
}

export class ReportSanctionsDto {
	@Expose()
	@Type(() => UserDto)
	user: UserDto | null;

	@Expose()
	@Type(() => UserDto)
	createdBy: UserDto | null;
}

export class FullReportDto extends ReportDto {
	@Expose()
	@Type(() => UserDto)
	reporter: UserDto | null;

	@Expose()
	@Type(() => UserDto)
	targetUser: UserDto | null;

	@Expose()
	@Type(() => ReportSanctionsDto)
	sanctions: ReportSanctionsDto[];
}
