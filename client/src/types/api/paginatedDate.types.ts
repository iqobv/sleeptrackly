export interface IPaginatedDataMeta {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface IPaginatedDateResponse<T> {
	items: T[];
	meta: IPaginatedDataMeta;
}
