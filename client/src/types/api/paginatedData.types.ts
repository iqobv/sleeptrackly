export interface IPaginatedDataMeta {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface IPaginatedDataResponse<T> {
	items: T[];
	meta: IPaginatedDataMeta;
}
