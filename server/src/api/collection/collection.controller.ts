import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { ImageValidationPipe } from '@libs/pipes/image-validation.pipe';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { withField } from '@libs/utils/with-field.util';
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
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import {
	CollectionDto,
	FullCollectionDto,
	PaginatedCollectionsDto,
} from './dto/collection.dto';
import {
	CreateCollectionDto,
	CreateCollectionSwaggerDto,
} from './dto/create-collection.dto';
import {
	UpdateCollectionDto,
	UpdateCollectionSwaggerDto,
} from './dto/update-collection.dto';

@ApiTags('Collection')
@Controller('collections')
export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	/** Create new collection */
	@Post()
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateCollectionSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@ApiCreatedResponse({ type: CollectionDto })
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		withField(ERROR_MESSAGES.COLLECTION.SLUG_DUPLICATE, 'slug'),
	)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.COLLECTION.PRODUCTS_NOT_FOUND,
	)
	public async createCollection(
		@UploadedFile(ImageValidationPipe()) icon: Express.Multer.File,
		@Body() dto: CreateCollectionDto,
	): Promise<CollectionDto> {
		return await this.collectionService.createCollection(dto, icon);
	}

	/** Get all collections */
	@Get('all')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: PaginatedCollectionsDto })
	public async getAllCollections(
		@Query() query: PaginationQueryDto,
	): Promise<PaginatedCollectionsDto> {
		return await this.collectionService.getAllCollections(query);
	}

	/** Get a collection by ID */
	@Get('id/:id')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: FullCollectionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.COLLECTION.NOT_FOUND)
	public async getCollectionById(
		@Param('id') id: string,
	): Promise<FullCollectionDto> {
		return await this.collectionService.getCollectionById(id);
	}

	/** Update collection */
	@Patch(':id')
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: UpdateCollectionSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
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
	public async updateCollection(
		@Param('id') id: string,
		@Body() dto: UpdateCollectionDto,
		@UploadedFile(ImageValidationPipe(5, false)) file?: Express.Multer.File,
	): Promise<FullCollectionDto> {
		return await this.collectionService.updateCollection(id, dto, file);
	}

	/** Delete a collection by ID */
	@Delete(':id')
	@Auth(UserRole.ADMIN)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.COLLECTION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.COLLECTION.NOT_FOUND)
	public async deleteCollection(
		@Param('id') id: string,
	): Promise<MessageResponse> {
		return await this.collectionService.deleteCollection(id);
	}
}
