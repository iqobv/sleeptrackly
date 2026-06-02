import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
class PaginatedMetaDto {
	@Expose() total: number;
	@Expose() page: number;
	@Expose() pageSize: number;
	@Expose() totalPages: number;
}

@Exclude()
export class PaginatedDataDto<T> {
	items: T[];

	@Expose()
	@Type(() => PaginatedMetaDto)
	meta: PaginatedMetaDto;
}
