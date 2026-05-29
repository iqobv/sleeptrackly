import { UserRole } from '@generated/prisma/enums';
import { Auth } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import { ImageValidationPipe } from '@libs/pipes';
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
	ApiBody,
	ApiConsumes,
	ApiNotFoundResponse,
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
	@ApiNotFoundResponse({ description: 'Collection not found' })
	@ApiOkResponse({ type: FullCollectionDto })
	@Get('id/:id')
	async getCollectionById(@Param('id') id: string) {
		return await this.collectionService.getCollectionById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all collections for store' })
	@ApiOkResponse({ type: FullCollectionDto })
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
	@ApiOperation({ summary: 'Delete a collection' })
	@ApiOkResponse({ example: { message: 'Collection deleted successfully' } })
	async deleteCollection(@Param('id') id: string) {
		return await this.collectionService.deleteCollection(id);
	}
}
