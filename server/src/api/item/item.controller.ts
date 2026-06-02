import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse, Auth } from '@libs/decorators';
import { PaginationQueryDto } from '@libs/dto';
import { FilesValidationPipe } from '@libs/pipes';
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
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import {
	CreateItemDto,
	CreateItemSwaggerDto,
	FullItemDto,
	FullPaginatedItemsDto,
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

@ApiTags('Item')
@Controller('items')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	/** Create a new item */
	@Post()
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateItemSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'media', maxCount: 1 },
			{ name: 'preview', maxCount: 1 },
		]),
	)
	@ApiCreatedResponse({ type: ItemDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.ITEM.IMAGE_REQUIRED)
	public async createItem(
		@Body() dto: CreateItemDto,
		@UploadedFiles(
			new FilesValidationPipe<CreateItemFiles>({
				media: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
				preview: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
			}),
		)
		files: CreateItemFiles,
	): Promise<ItemDto> {
		return await this.itemService.createItem(dto, files);
	}

	/** Get all items */
	@Get()
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: PaginatedItemsDto })
	public async getAllItems(
		@Query() query: PaginationQueryDto,
	): Promise<PaginatedItemsDto> {
		return await this.itemService.getAllItems(query);
	}

	/**
	 * Get all available items
	 *
	 * @remarks Retrieves a paginated list of items that are not currently assigned to any product. The items are sorted by creation date in descending order (newest first) and include their translations.
	 */
	@Get('available')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: FullPaginatedItemsDto })
	public async getAllAvailableItems(
		@Query() query: PaginationQueryDto,
	): Promise<FullPaginatedItemsDto> {
		return await this.itemService.getAllAvailableItems(query);
	}

	/** Get an item by ID */
	@Get('id/:id')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: FullItemDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ITEM.NOT_FOUND)
	public async getById(@Param('id') id: string): Promise<FullItemDto> {
		return await this.itemService.getById(id);
	}

	/** Update an item */
	@Patch(':id')
	@Auth(UserRole.ADMIN)
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: UpdateItemDtoSwaggerDto })
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'media', maxCount: 1 },
			{ name: 'preview', maxCount: 1 },
		]),
	)
	@ApiOkResponse({ type: FullItemDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ITEM.NOT_FOUND)
	public async updateItem(
		@Param('id') id: string,
		@Body() dto: UpdateItemDto,
		@UploadedFiles(
			new FilesValidationPipe<UpdateItemFiles>({
				media: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
				preview: { maxSizeMb: 12, allowedTypes: ALLOWED_TYPES },
			}),
		)
		files: UpdateItemFiles,
	): Promise<FullItemDto> {
		return await this.itemService.updateItem(id, dto, files);
	}

	/** Delete an item */
	@Delete(':id')
	@Auth(UserRole.ADMIN)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.ITEM.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ITEM.NOT_FOUND)
	public async deleteItem(@Param('id') id: string): Promise<MessageResponse> {
		return await this.itemService.deleteItem(id);
	}
}
