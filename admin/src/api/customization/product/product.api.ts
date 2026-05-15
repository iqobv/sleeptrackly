import { apiClient } from '@/api/axios';
import {
	CreateProductDto,
	PaginationWithLanguageDto,
	UpdateProductDto,
} from '@/dto';
import { IPaginatedDataResponse, IProduct } from '@/types';

export const getAllProducts = async (query: PaginationWithLanguageDto) =>
	(
		await apiClient.get<IPaginatedDataResponse<IProduct>>(`/v1/products`, {
			params: query,
		})
	).data;

export const getProductById = async (id: string) =>
	(await apiClient.get<IProduct>(`/v1/products/${id}`)).data;

export const createProduct = async (dto: CreateProductDto) =>
	(await apiClient.post<IProduct>('/v1/products', dto)).data;

export const updateProduct = async (id: string, dto: UpdateProductDto) =>
	(await apiClient.patch<IProduct>(`/v1/products/${id}`, dto)).data;

export const deleteProduct = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/products/${id}`)).data;
