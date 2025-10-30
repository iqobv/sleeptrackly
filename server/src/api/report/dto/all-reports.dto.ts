import { ApiProperty } from '@nestjs/swagger';
import { ReportDto } from './report.dto';

class PaginationMetaDto {
	@ApiProperty({ example: 1 }) total: number;
	@ApiProperty({ example: 1 }) page: number;
	@ApiProperty({ example: 10 }) pageSize: number;
	@ApiProperty({ example: 1 }) totalPages: number;
}

export class AllReportsDto {
	@ApiProperty({ type: ReportDto, isArray: true })
	items: ReportDto[];

	@ApiProperty({
		example: {
			total: 1,
			page: 1,
			pageSize: 10,
			totalPages: 1,
		},
	})
	@ApiProperty({ type: PaginationMetaDto })
	meta: PaginationMetaDto;
}
