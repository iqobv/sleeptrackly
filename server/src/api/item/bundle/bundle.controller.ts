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
import { PaginationQueryDto } from 'src/libs/dto';
import { BundleService } from './bundle.service';
import {
	BundleDto,
	CreateBundleDto,
	FullBundleDto,
	UpdateBundleDto,
} from './dto';

@Controller('items/bundles')
export class BundleController {
	constructor(private readonly bundleService: BundleService) {}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Create a new bundle' })
	@ApiCreatedResponse({ type: BundleDto })
	@Post()
	async createBundle(@Body() dto: CreateBundleDto) {
		return await this.bundleService.createBundle(dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all bundles with pagination' })
	@ApiOkResponse({ type: [FullBundleDto] })
	@Get()
	async getAllBundles(@Query() query: PaginationQueryDto) {
		return await this.bundleService.getAllBundles(query);
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
	@Patch(':id')
	async updateBundle(@Param('id') id: string, @Body() dto: UpdateBundleDto) {
		return await this.bundleService.updateBundle(id, dto);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Delete a bundle by ID' })
	@ApiOkResponse({ type: Boolean })
	@Delete(':id')
	async removeBundle(@Param('id') id: string) {
		return await this.bundleService.removeBundle(id);
	}

	@Auth(UserRole.ADMIN)
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
