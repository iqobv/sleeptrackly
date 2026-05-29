import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse, Auth } from '@libs/decorators';
import { PaginationQueryDto } from '@libs/dto';
import { FilesValidationPipe } from '@libs/pipes';
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
	ApiTags,
} from '@nestjs/swagger';
import {
	CreateItemDto,
	CreateItemSwaggerDto,
	ItemDto,
	PaginatedItemsDto,
	UpdateItemDto,
	UpdateItemDtoSwaggerDto,
} from './dto';
import { ItemService } from './item.service';
import type { CreateItemFiles, UpdateItemFiles } from './types';

const ALLOWED_TYPES = [
	'image/png',
	'image/jpeg',
	'image/jpg',
	'image/gif',
	'image/webp',
	'video/mp4',
	'video/webm',
];

@ApiTags('Items')
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
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.ITEM.IMAGE_REQUIRED)
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateItemSwaggerDto })
	@ApiCreatedResponse({ type: ItemDto })
	@Post()
	async createItem(
		@Body() dto: CreateItemDto,
		@UploadedFiles(
			new FilesValidationPipe<CreateItemFiles>({
				media: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
				preview: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
			}),
		)
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
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ITEM.NOT_FOUND)
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
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ITEM.NOT_FOUND)
	@ApiBody({ type: UpdateItemDtoSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@Patch(':id')
	async updateItem(
		@Param('id') id: string,
		@Body() dto: UpdateItemDto,
		@UploadedFiles(
			new FilesValidationPipe<UpdateItemFiles>({
				media: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
				preview: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
			}),
		)
		files: UpdateItemFiles,
	) {
		return await this.itemService.updateItem(id, dto, files);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Delete an item' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.ITEM.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ITEM.NOT_FOUND)
	@Delete(':id')
	async deleteItem(@Param('id') id: string) {
		return await this.itemService.deleteItem(id);
	}
}
