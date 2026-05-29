import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import { ImageValidationPipe } from '@libs/pipes';
import { withField } from '@libs/utils';
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
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import {
	CollectionDto,
	CreateCollectionDto,
	CreateCollectionSwaggerDto,
	FullCollectionDto,
	StoreCollectionDto,
	UpdateCollectionDto,
	UpdateCollectionSwaggerDto,
} from './dto';

@Controller('collections')
export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Create a new collection' })
	@ApiConsumes('multipart/form-data')
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		withField(ERROR_MESSAGES.COLLECTION.SLUG_DUPLICATE, 'slug'),
	)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.COLLECTION.PRODUCTS_NOT_FOUND,
	)
	@ApiBody({ type: CreateCollectionSwaggerDto })
	@UseInterceptors(FileInterceptor('icon'))
	@ApiBody({ type: CreateCollectionSwaggerDto })
	@Post()
	async createCollection(
		@UploadedFile(ImageValidationPipe()) icon: Express.Multer.File,
		@Body() dto: CreateCollectionDto,
	) {
		return await this.collectionService.createCollection(dto, icon);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all collections' })
	@ApiOkResponse({ type: [CollectionDto] })
	@Get('all')
	async getAllCollections() {
		return await this.collectionService.getAllCollections();
	}

	@Auth()
	@ApiOperation({ summary: 'Get all collections for store filter' })
	@ApiOkResponse({ type: [StoreCollectionDto] })
	@Get('store')
	async getAllCollectionsForStore(@Query() query: LanguageQueryDto) {
		return await this.collectionService.getAllCollectionsForStore(query);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get a collection by ID' })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.COLLECTION.NOT_FOUND)
	@ApiOkResponse({ type: FullCollectionDto })
	@Get('id/:id')
	async getCollectionById(@Param('id') id: string) {
		return await this.collectionService.getCollectionById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all collections for store' })
	@ApiOkResponse({ type: FullCollectionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.COLLECTION.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.CONFLICT, {
		...ERROR_MESSAGES.COLLECTION.SLUG_DUPLICATE,
		field: 'slug',
	})
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.COLLECTION.PRODUCTS_NOT_FOUND,
	)
	@ApiBody({ type: UpdateCollectionSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@Patch(':id')
	async updateCollection(
		@Param('id') id: string,
		@Body() dto: UpdateCollectionDto,
		@UploadedFile(ImageValidationPipe(5, false)) file?: Express.Multer.File,
	) {
		return await this.collectionService.updateCollection(id, dto, file);
	}

	@Auth(UserRole.ADMIN)
	@Delete(':id')
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.COLLECTION.NOT_FOUND)
	@ApiOperation({ summary: 'Delete a collection' })
	@ApiOkResponse({ example: { message: 'Collection deleted successfully' } })
	async deleteCollection(@Param('id') id: string) {
		return await this.collectionService.deleteCollection(id);
	}
}
