import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Auth } from 'src/libs/decorators';
import { PaginationQueryDto } from 'src/libs/dto';
import {
	CreateItemDto,
	CreateItemSwaggerDto,
	ItemDto,
	PaginatedItemsDto,
	UpdateItemDto,
	UpdateItemDtoSwaggerDto,
} from './dto';
import { ItemService } from './item.service';
import { CreateItemFiles, UpdateItemFiles } from './types';

@Controller('items')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@ApiOperation({ summary: 'Create a new item' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'media', maxCount: 1 },
			{ name: 'preview', maxCount: 1 },
		]),
	)
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateItemSwaggerDto })
	@ApiCreatedResponse({ type: ItemDto })
	@Post()
	async createItem(
		@Body() dto: CreateItemDto,
		@UploadedFiles()
		files: CreateItemFiles,
	) {
		return await this.itemService.createItem(dto, files);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all items with pagination' })
	@ApiOkResponse({ type: PaginatedItemsDto })
	@Get()
	async getAllItems(@Query() query: PaginationQueryDto) {
		return await this.itemService.getAllItems(query);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all available items with pagination' })
	@ApiOkResponse({ type: PaginatedItemsDto })
	@Get('available')
	async getAllAvailableItems(@Query() query: PaginationQueryDto) {
		return await this.itemService.getAllAvailableItems(query);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get item by ID' })
	@ApiOkResponse({ type: ItemDto })
	@Get('id/:id')
	async getById(@Param('id') id: string) {
		return await this.itemService.getById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Update an existing item' })
	@ApiOkResponse({ type: ItemDto })
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'media', maxCount: 1 },
			{ name: 'preview', maxCount: 1 },
		]),
	)
	@ApiBody({ type: UpdateItemDtoSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@Patch(':id')
	async updateItem(
		@Param('id') id: string,
		@Body() dto: UpdateItemDto,
		@UploadedFiles()
		files: UpdateItemFiles,
	) {
		return await this.itemService.updateItem(id, dto, files);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Delete an item' })
	@ApiOkResponse({ type: Boolean })
	@Delete(':id')
	async deleteItem(@Param('id') id: string) {
		return await this.itemService.deleteItem(id);
	}
}
