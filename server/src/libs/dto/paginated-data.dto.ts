import { ApiProperty } from '@nestjs/swagger';

class PaginatedMetaDto {
	@ApiProperty({ example: 100 })
	total: number;

	@ApiProperty({ example: 1 })
	page: number;

	@ApiProperty({ example: 20 })
	pageSize: number;

	@ApiProperty({ example: 5 })
	totalPages: number;
}

export class PaginatedDataDto<T> {
	@ApiProperty({ type: 'array' })
	items: T[];

	@ApiProperty({ type: PaginatedMetaDto })
	meta: PaginatedMetaDto;
}
