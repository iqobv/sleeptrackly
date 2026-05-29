import { UserRole } from '@generated/prisma/enums';
import { Auth } from '@libs/decorators';
import { PaginationQueryDto } from '@libs/dto';
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
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { BundleService } from './bundle.service';
import {
	BundleDto,
	CreateBundleDto,
	CreateBundleSwaggerDto,
	FullBundleDto,
	PaginatedBundlesDto,
	UpdateBundleDto,
	UpdateBundleSwaggerDto,
} from './dto';

@Controller('items/bundles')
export class BundleController {
	constructor(private readonly bundleService: BundleService) {}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Create a new bundle' })
	@ApiCreatedResponse({ type: BundleDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@ApiBody({ type: CreateBundleSwaggerDto })
	@Post()
	async createBundle(
		@UploadedFile(ImageValidationPipe()) file: Express.Multer.File,
		@Body() dto: CreateBundleDto,
	) {
		return await this.bundleService.createBundle(dto, file);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all bundles with pagination' })
	@ApiOkResponse({ type: [FullBundleDto] })
	@Get()
	async getAllBundles(@Query() query: PaginationQueryDto) {
		return await this.bundleService.getAllBundles(query);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all available bundles with pagination' })
	@ApiOkResponse({ type: PaginatedBundlesDto })
	@Get('available')
	async getAllAvailableItems(@Query() query: PaginationQueryDto) {
		return await this.bundleService.getAllAvailableItems(query);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get a bundle by ID' })
	@ApiOkResponse({ type: FullBundleDto })
	@Get('id/:id')
	async getBundleById(@Param('id') id: string) {
		return await this.bundleService.getById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Update a bundle by ID' })
	@ApiOkResponse({ type: BundleDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@ApiBody({ type: UpdateBundleSwaggerDto })
	@Patch(':id')
	async updateBundle(
		@Param('id') id: string,
		@Body() dto: UpdateBundleDto,
		@UploadedFile(ImageValidationPipe(5, false)) file: Express.Multer.File,
	) {
		return await this.bundleService.updateBundle(id, dto, file);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Delete a bundle by ID' })
	@ApiOkResponse({ type: Boolean })
	@Delete(':id')
	async removeBundle(@Param('id') id: string) {
		return await this.bundleService.removeBundle(id);
	}
}
