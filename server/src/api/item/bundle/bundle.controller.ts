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
import { UserRole } from '@prisma/client';
import { Auth } from 'src/libs/decorators';
import { BundleService } from './bundle.service';
import {
	BundleDto,
	BundleQueryDto,
	CreateBundleDto,
	FullBundleDto,
} from './dto';

@Controller('items/bundles')
export class BundleController {
	constructor(private readonly bundleService: BundleService) {}

	@ApiOperation({ summary: 'Create a new bundle' })
	@ApiCreatedResponse({ type: BundleDto })
	@Post()
	@Auth(UserRole.ADMIN)
	async createBundle(@Body() dto: CreateBundleDto) {
		return await this.bundleService.createBundle(dto);
	}

	@ApiOperation({ summary: 'Get all bundles with pagination' })
	@ApiOkResponse({ type: [FullBundleDto] })
	@Get()
	async getAllBundles(@Query() query: BundleQueryDto) {
		return await this.bundleService.getAllBundles(query);
	}

	@ApiOperation({ summary: 'Get a bundle by ID' })
	@ApiOkResponse({ type: FullBundleDto })
	@Get('id/:id')
	async getBundleById(
		@Param('id') id: string,
		@Query('language') language: string,
	) {
		return await this.bundleService.getById(id, language);
	}

	@ApiOperation({ summary: 'Update a bundle by ID' })
	@ApiOkResponse({ type: BundleDto })
	@Patch(':id')
	@Auth(UserRole.ADMIN)
	async updateBundle(@Param('id') id: string, @Body() dto: CreateBundleDto) {
		return await this.bundleService.updateBundle(id, dto);
	}

	@ApiOperation({ summary: 'Delete a bundle by ID' })
	@ApiOkResponse({ type: Boolean })
	@Auth(UserRole.ADMIN)
	@Delete(':id')
	async removeBundle(@Param('id') id: string) {
		return await this.bundleService.removeBundle(id);
	}

	@ApiOperation({ summary: 'Upload bundle image' })
	@ApiConsumes('multipart/form-data')
	@ApiOkResponse({ type: BundleDto })
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
	async uploadBundleImage(
		@UploadedFile() file: Express.Multer.File,
		@Param('id') id: string,
	) {
		return await this.bundleService.uploadBundleImage(file, id);
	}
}
