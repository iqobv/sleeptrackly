import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { LanguageQueryDto } from '@libs/dto/language-query.dto';
import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeaturedShopDto } from './dto/featured-shop.dto';
import { FilterQueryDto } from './dto/filter-query.dto';
import { FiltersDto } from './dto/filters.dto';
import { PaginatedShopProductsDto } from './dto/paginated-products.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { ShopProductDto } from './dto/shop-product.dto';
import { ShopService } from './shop.service';

@Auth()
@ApiTags('Shop')
@Controller('shop')
export class ShopController {
	constructor(private readonly shopService: ShopService) {}

	/** Get featured products for the shop */
	@Get('featured')
	@ApiOkResponse({ type: FeaturedShopDto })
	public async getFeaturedProducts(
		@Query() query: LanguageQueryDto,
		@Authorized('id') userId?: string,
	): Promise<FeaturedShopDto> {
		return await this.shopService.getFeaturedProducts(
			query.language ?? 'en',
			userId,
		);
	}

	/** Get all products with optional filters */
	@Get('all')
	@ApiOkResponse({ type: PaginatedShopProductsDto })
	public async getAllProducts(
		@Query() query: FilterQueryDto,
		@Authorized('id') userId?: string,
	): Promise<PaginatedShopProductsDto> {
		return await this.shopService.getAllProducts(query, userId);
	}

	/** Get available filters for the shop */
	@Get('filters')
	@ApiOkResponse({ type: FiltersDto })
	public async getAvailableFilters(
		@Query() query: LanguageQueryDto,
	): Promise<FiltersDto> {
		return await this.shopService.getFilters(query);
	}

	/** Get a product by its ID */
	@Get('product/:id')
	@ApiOkResponse({ type: ShopProductDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	public async getProductById(
		@Query('id') id: string,
		@Query() query: LanguageQueryDto,
	): Promise<ShopProductDto> {
		return await this.shopService.getProductById(id, query.language ?? 'en');
	}

	/** Purchase a product */
	@Post('purchase/:productId')
	@ApiOkResponse({ type: PurchaseDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.PRODUCT.NOT_FOUND,
		ERROR_MESSAGES.COIN.NOT_FOUND,
	])
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.COIN_TRANSACTION.INSUFFICIENT_FUNDS,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.USER_INVENTORY.ITEM_ALREADY_OWNED,
	)
	public async purchaseProduct(
		@Authorized('id') userId: string,
		@Param('productId') productId: string,
	): Promise<PurchaseDto> {
		return await this.shopService.purchaseProduct(userId, productId);
	}
}
