import {
	CreateProductDto,
	PaginationWithLanguageDto,
	UpdateProductDto,
} from '@/dto';
import { IPaginatedDataResponse, IProduct } from '@/types';
import { fetcher } from '@/utils';

export const getAllProducts = async (query: PaginationWithLanguageDto) =>
	await fetcher<IPaginatedDataResponse<IProduct>>(
		`/api/v1/products?${new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)]))}`,
	);

export const getProductById = async (id: string) =>
	await fetcher<IProduct>(`/api/v1/products/${id}`);

export const createProduct = async (dto: CreateProductDto) =>
	await fetcher<IProduct>('/api/v1/products', {
		method: 'POST',
		body: JSON.stringify(dto),
	});

export const updateProduct = async (id: string, dto: UpdateProductDto) =>
	await fetcher<IProduct>(`/api/v1/products/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(dto),
	});

export const deleteProduct = async (id: string) =>
	await fetcher<boolean>(`/api/v1/products/${id}`, {
		method: 'DELETE',
	});
