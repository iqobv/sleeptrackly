import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';

export const paginate = async <T>(
	query: PaginationQueryDto,
	fetcher: (
		limit: number,
		offset: number,
	) => Promise<{ items: T[]; total: number }>,
): Promise<PaginatedDataDto<T>> => {
	const { page = 1, limit = 20 } = query;

	const safePage = Math.max(Number(page), 1);
	const safeSize = Math.max(Number(limit), 1);
	const offset = (safePage - 1) * safeSize;

	const { items, total } = await fetcher(safeSize, offset);

	return {
		items,
		meta: {
			total,
			page,
			pageSize: limit,
			totalPages: Math.ceil(total / limit),
		},
	};
};
