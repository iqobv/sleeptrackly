export interface PaginatedDataMeta {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface PaginatedDataResponse<T> {
	items: T[];
	meta: PaginatedDataMeta;
}
