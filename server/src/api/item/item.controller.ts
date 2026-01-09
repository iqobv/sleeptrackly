import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Auth } from 'src/libs/decorators';
import {
	CreateItemDto,
	ItemDto,
	PaginatedItemsDto,
	QueryItemDto,
	UpdateItemDto,
} from './dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@ApiOperation({ summary: 'Create a new item' })
	@Auth(UserRole.ADMIN)
	@ApiCreatedResponse({ type: ItemDto })
	@Post()
	async createItem(@Body() dto: CreateItemDto) {
		return await this.itemService.createItem(dto);
	}

	@Post('upload/:id')
	@UseInterceptors(FileInterceptor('file'))
	async uploadItemImage(
		@UploadedFile() file: Express.Multer.File,
		@Param('id') id: string,
	) {
		return await this.itemService.uploadItemImage(file, id);
	}

	@ApiOperation({ summary: 'Get all items with pagination' })
	@ApiOkResponse({ type: PaginatedItemsDto })
	@Get()
	async getAllItems(@Query() query: QueryItemDto) {
		return await this.itemService.getAllItems(query);
	}

	@ApiOperation({ summary: 'Get item by ID' })
	@ApiOkResponse({ type: ItemDto })
	@Get('id/:id')
	async getById(
		@Param('id') id: string,
		@Query('language') language: string = 'en',
	) {
		return await this.itemService.getById(id, language);
	}

	@ApiOperation({ summary: 'Update an existing item' })
	@ApiOkResponse({ type: ItemDto })
	@Auth(UserRole.ADMIN)
	@Patch(':id')
	async updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto) {
		return await this.itemService.updateItem(id, dto);
	}

	@ApiOperation({ summary: 'Delete an item' })
	@ApiOkResponse({ type: Boolean })
	@Auth(UserRole.ADMIN)
	@Delete(':id')
	async deleteItem(@Param('id') id: string) {
		return await this.itemService.deleteItem(id);
	}
}
