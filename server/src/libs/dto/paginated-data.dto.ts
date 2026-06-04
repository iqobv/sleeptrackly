import { Expose, Type } from 'class-transformer';

class PaginatedMetaDto {
	@Expose() total: number;
	@Expose() page: number;
	@Expose() pageSize: number;
	@Expose() totalPages: number;
}

export class PaginatedDataDto<T> {
	@Expose()
	items: T[];

	@Expose()
	@Type(() => PaginatedMetaDto)
	meta: PaginatedMetaDto;
}
