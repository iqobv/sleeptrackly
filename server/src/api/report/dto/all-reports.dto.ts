import { PaginatedDataDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { ReportDto } from './report.dto';

export class AllReportsDto extends PaginatedDataDto<ReportDto> {
	@Expose()
	@Type(() => ReportDto)
	declare items: ReportDto[];
}
