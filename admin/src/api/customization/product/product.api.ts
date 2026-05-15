import { apiClient } from '@/api/axios';
import {
	CreateProductDto,
	PaginationWithLanguageDto,
	UpdateProductDto,
} from '@/dto';
import { PaginatedDataResponse, Product } from '@/types';

export const getAllProducts = async (query: PaginationWithLanguageDto) =>
	(
		await apiClient.get<PaginatedDataResponse<Product>>(`/v1/products`, {
			params: query,
		})
	).data;

export const getProductById = async (id: string) =>
	(await apiClient.get<Product>(`/v1/products/${id}`)).data;

export const createProduct = async (dto: CreateProductDto) =>
	(await apiClient.post<Product>('/v1/products', dto)).data;

export const updateProduct = async (id: string, dto: UpdateProductDto) =>
	(await apiClient.patch<Product>(`/v1/products/${id}`, dto)).data;

export const deleteProduct = async (id: string) =>
	(await apiClient.delete<boolean>(`/v1/products/${id}`)).data;
