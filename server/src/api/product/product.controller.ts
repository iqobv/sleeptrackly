import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Auth } from 'src/libs/decorators';
import { PaginationQueryWithLanguageDto } from 'src/libs/dto';
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
	@Post()
	async createProduct(@Body() dto: CreateProductDto) {
		return await this.productService.createProduct(dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get product by ID' })
	@ApiOkResponse({ type: FullProductDto })
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
	@Patch(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return await this.productService.updateProduct(id, dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Remove a product by ID' })
	@ApiOkResponse({ type: Boolean })
	@Delete(':id')
	async removeProduct(@Param('id') id: string) {
		return await this.productService.removeProduct(id);
	}
}
