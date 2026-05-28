import { UserRole } from '@generated/prisma/enums';
import { Auth } from '@libs/decorators';
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
	UpdateCollectionDto,
	UpdateCollectionSwaggerDto,
} from './dto';

const parsePipe = new ParseFilePipe({
	validators: [
		new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
		new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif|webp|webm)' }),
	],
});

@Controller('collections')
export class CollectionController {
	constructor(private readonly collectionService: CollectionService) {}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Create a new collection' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiBody({ type: CreateCollectionSwaggerDto })
	@Post()
	async createCollection(
		@UploadedFile(parsePipe) image: Express.Multer.File,
		@Body() dto: CreateCollectionDto,
	) {
		return await this.collectionService.createCollection(dto, image);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all collections' })
	@ApiOkResponse({ type: [CollectionDto] })
	@Get('all')
	async getAllCollections() {
		return await this.collectionService.getAllCollections();
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
	@UseInterceptors(FileInterceptor('image'))
	@Patch(':id')
	async updateCollection(
		@Param('id') id: string,
		@Body() dto: UpdateCollectionDto,
		@UploadedFile(parsePipe) file?: Express.Multer.File,
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
