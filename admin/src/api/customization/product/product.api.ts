import { apiClient } from '@/api/axios';
import {
	CreateProductDto,
	PaginationWithLanguageDto,
	UpdateProductDto,
} from '@/dto';
import { paths } from '@/types/schema';

type GetAllProductsResponse =
	paths['/v1/products']['get']['responses']['200']['content']['application/json'];
type GetProductByIdResponse =
	paths['/v1/products/{id}']['get']['responses']['200']['content']['application/json'];
type CreateProductResponse =
	paths['/v1/products']['post']['responses']['200']['content']['application/json'];
type UpdateProductResponse =
	paths['/v1/products/{id}']['patch']['responses']['200']['content']['application/json'];
type DeleteProductResponse =
	paths['/v1/products/{id}']['delete']['responses']['200']['content']['application/json'];

export const getAllProducts = async (query: PaginationWithLanguageDto) =>
	(
		await apiClient.get<GetAllProductsResponse>(`/v1/products`, {
			params: query,
		})
	).data;

export const getProductById = async (id: string) =>
	(await apiClient.get<GetProductByIdResponse>(`/v1/products/${id}`)).data;

export const createProduct = async (dto: CreateProductDto) =>
	(await apiClient.post<CreateProductResponse>('/v1/products', dto)).data;

export const updateProduct = async (id: string, dto: UpdateProductDto) =>
	(await apiClient.patch<UpdateProductResponse>(`/v1/products/${id}`, dto))
		.data;

export const deleteProduct = async (id: string) =>
	(await apiClient.delete<DeleteProductResponse>(`/v1/products/${id}`)).data;

// {
//     type: "ITEM" | "BUNDLE";
//     itemType: "AVATAR" | "AVATAR_FRAME" | "ANIMATED_AVATAR" | "BACKGROUND_IMAGE" | "MINI_BACKGROUND_IMAGE" | "BADGE" | null;
//     item: { ... 11 more } | null;
//     bundle: { ... 9 more } | null;
//     bundleId: string | null;
//     itemId: string | null;
//     isNew: boolean;
//     isPopular: boolean;
//     isExclusive: boolean;
//     isShowInStore: boolean;
//     isLimited: boolean;
//     price: number;
//     discountedPrice: number | null;
//     maxStock: number | null;
//     soldCount: number;
//     expiresAt: string | null;
//     id: string;
//     createdAt: string;
//     updatedAt: string;
// }
