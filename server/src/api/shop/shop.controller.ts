import { Authorized } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FullProductDto } from '../product/dto';
import {
	AllShopDto,
	FeaturedShopDto,
	FilterQueryDto,
	PurchaseDto,
} from './dto';
import { ShopService } from './shop.service';

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
	@Get('product/:id')
	async getProductById(
		@Query('id') id: string,
		@Query() query: LanguageQueryDto,
	) {
		return await this.shopService.getProductById(id, query.language ?? 'en');
	}

	@ApiOperation({ summary: 'Purchase a product' })
	@ApiOkResponse({ type: PurchaseDto })
	@Post('purchase/:productId')
	async purchaseProduct(
		@Authorized('id') userId: string,
		@Param('productId') productId: string,
	) {
		return await this.shopService.purchaseProduct(userId, productId);
	}
}
