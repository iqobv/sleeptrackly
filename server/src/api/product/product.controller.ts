import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse, Auth } from '@libs/decorators';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	CreateProductDto,
	FullProductDto,
	PaginatedFullProductDto,
	ProductDto,
	UpdateProductDto,
} from './dto';
import { ProductService } from './product.service';

@Auth(UserRole.ADMIN)
@ApiTags('Product')
@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	/** Create a new product */
	@Post()
	@ApiOkResponse({ type: ProductDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.PRODUCT.REQUIRED_PAYLOAD_MISSING,
		ERROR_MESSAGES.PRODUCT.MUTUALLY_EXCLUSIVE_PAYLOAD,
		ERROR_MESSAGES.PRODUCT.EXPIRES_AT_INVALID_FUTURE,
	])
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.PRODUCT.ALREADY_EXISTS)
	public async createProduct(
		@Body() dto: CreateProductDto,
	): Promise<ProductDto> {
		return await this.productService.createProduct(dto);
	}

	/** Get a product by its ID */
	@Get(':id')
	@ApiOkResponse({ type: FullProductDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	public async getProductById(
		@Param('id') id: string,
	): Promise<FullProductDto> {
		return await this.productService.getProductById(id);
	}

	/** Get all products */
	@Get()
	@ApiOkResponse({ type: PaginatedFullProductDto })
	public async getAllProducts(
		@Query() query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedFullProductDto> {
		return await this.productService.getAllProducts(query);
	}

	/** Update a product by its ID */
	@Patch(':id')
	@ApiOkResponse({ type: ProductDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	public async updateProduct(
		@Param('id') id: string,
		@Body() dto: UpdateProductDto,
	): Promise<ProductDto> {
		return await this.productService.updateProduct(id, dto);
	}

	/** Delete a product by its ID */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PRODUCT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	public async removeProduct(
		@Param('id') id: string,
	): Promise<MessageResponse> {
		return await this.productService.removeProduct(id);
	}
}
