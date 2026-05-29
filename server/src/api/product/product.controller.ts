import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse, Auth } from '@libs/decorators';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
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
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import {
	CreateProductDto,
	FullProductDto,
	PaginatedProductDto,
	ProductDto,
	UpdateProductDto,
} from './dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Create a new product' })
	@ApiOkResponse({ type: ProductDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.PRODUCT.REQUIRED_PAYLOAD_MISSING,
		ERROR_MESSAGES.PRODUCT.MUTUALLY_EXCLUSIVE_PAYLOAD,
		ERROR_MESSAGES.PRODUCT.EXPIRES_AT_INVALID_FUTURE,
	])
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.PRODUCT.ALREADY_EXISTS)
	@Post()
	async createProduct(@Body() dto: CreateProductDto) {
		return await this.productService.createProduct(dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get product by ID' })
	@ApiOkResponse({ type: FullProductDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	@Get(':id')
	async getProductById(@Param('id') id: string) {
		return await this.productService.getProductById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({
		summary: 'Get all products with pagination and language support',
	})
	@ApiOkResponse({ type: PaginatedProductDto })
	@Get()
	async getAllProducts(@Query() query: PaginationQueryWithLanguageDto) {
		return await this.productService.getAllProducts(query);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Update an existing product' })
	@ApiOkResponse({ type: ProductDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	@Patch(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return await this.productService.updateProduct(id, dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Remove a product by ID' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PRODUCT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PRODUCT.NOT_FOUND)
	@Delete(':id')
	async removeProduct(@Param('id') id: string) {
		return await this.productService.removeProduct(id);
	}
}
