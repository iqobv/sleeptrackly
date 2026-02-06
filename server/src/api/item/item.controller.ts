import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
} from './dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@ApiOperation({ summary: 'Create a new item' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateItemSwaggerDto })
	@ApiCreatedResponse({ type: ItemDto })
	@Post()
	async createItem(
		@Body() dto: CreateItemDto,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif|webp|webm)' }),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		return await this.itemService.createItem(dto, file);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Upload item image' })
	@ApiConsumes('multipart/form-data')
	@ApiOkResponse({ type: ItemDto })
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@Post('upload/:id')
	@UseInterceptors(FileInterceptor('file'))
	async uploadItemImage(
		@UploadedFile() file: Express.Multer.File,
		@Param('id') id: string,
	) {
		return await this.itemService.uploadItemImage(file, id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all items with pagination' })
	@ApiOkResponse({ type: PaginatedItemsDto })
	@Get()
	async getAllItems(@Query() query: PaginationQueryDto) {
		return await this.itemService.getAllItems(query);
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
	@Patch(':id')
	async updateItem(@Param('id') id: string, @Body() dto: UpdateItemDto) {
		return await this.itemService.updateItem(id, dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Delete an item' })
	@ApiOkResponse({ type: Boolean })
	@Delete(':id')
	async deleteItem(@Param('id') id: string) {
		return await this.itemService.deleteItem(id);
	}
}
