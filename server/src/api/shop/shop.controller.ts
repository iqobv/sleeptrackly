import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import {
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FullProductDto } from '../product/dto';
import {
	AllShopDto,
	FeaturedShopDto,
	FilterQueryDto,
	PurchaseDto,
} from './dto';
import { ShopService } from './shop.service';

@Auth()
@Controller('shop')
export class ShopController {
	constructor(private readonly shopService: ShopService) {}

	@ApiOperation({ summary: 'Get featured products' })
	@ApiOkResponse({ type: FeaturedShopDto })
	@Get('featured')
	async getFeaturedProducts(
		@Query() query: LanguageQueryDto,
		@Authorized('id') userId?: string,
	) {
		return await this.shopService.getFeaturedProducts(
			query.language ?? 'en',
			userId,
		);
	}

	@ApiOperation({ summary: 'Get all products with optional filters' })
	@ApiOkResponse({ type: AllShopDto })
	@Get('all')
	async getAllProducts(
		@Query() query: FilterQueryDto,
		@Authorized('id') userId?: string,
	) {
		return await this.shopService.getAllProducts(query, userId);
	}

	@ApiOperation({ summary: 'Get product by ID' })
	@ApiOkResponse({ type: FullProductDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	@Get('product/:id')
	async getProductById(
		@Query('id') id: string,
		@Query() query: LanguageQueryDto,
	) {
		return await this.shopService.getProductById(id, query.language ?? 'en');
	}

	@ApiOperation({ summary: 'Purchase a product' })
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
	@Post('purchase/:productId')
	async purchaseProduct(
		@Authorized('id') userId: string,
		@Param('productId') productId: string,
	) {
		return await this.shopService.purchaseProduct(userId, productId);
	}
}
