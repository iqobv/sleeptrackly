import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, ApiSuccessResponse, Auth } from '@libs/decorators';
import { PaginationQueryDto } from '@libs/dto';
import { ImageValidationPipe } from '@libs/pipes';
import { MessageResponse } from '@libs/types';
import {
	BadRequestException,
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
import { BundleService } from './bundle.service';
import {
	BaseBundleDto,
	BundleDto,
	CreateBundleDto,
	CreateBundleSwaggerDto,
	PaginatedAvailableBundlesDto,
	PaginatedFullBundlesDto,
	UpdateBundleDto,
	UpdateBundleSwaggerDto,
} from './dto';

@ApiTags('Bundle')
@Controller('bundles')
export class BundleController {
	constructor(private readonly bundleService: BundleService) {}

	/** Create a new bundle */
	@Post()
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateBundleSwaggerDto })
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiCreatedResponse({ type: BaseBundleDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.ITEM.IMAGE_REQUIRED,
		ERROR_MESSAGES.IMAGE.PROCESSING_FAILED,
	])
	public async createBundle(
		@UploadedFile(ImageValidationPipe()) file: Express.Multer.File,
		@Body() dto: CreateBundleDto,
	): Promise<BaseBundleDto> {
		if (!file)
			throw new BadRequestException(ERROR_MESSAGES.ITEM.IMAGE_REQUIRED);

		return await this.bundleService.createBundle(dto, file);
	}

	/** Get all bundles */
	@Get()
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: PaginatedFullBundlesDto })
	public async getAllBundles(
		@Query() query: PaginationQueryDto,
	): Promise<PaginatedFullBundlesDto> {
		return await this.bundleService.getAllBundles(query);
	}

	/**
	 * Get all available bundles
	 *
	 * @remarks Retrieves a paginated list of items that are not currently assigned to any bundle. The items are sorted by creation date in descending order (newest first) and include their translations.
	 */
	@Get('available')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: PaginatedAvailableBundlesDto })
	public async getAllAvailableItems(
		@Query() query: PaginationQueryDto,
	): Promise<PaginatedAvailableBundlesDto> {
		return await this.bundleService.getAllAvailableItems(query);
	}

	/** Get the bundle by ID */
	@Get('id/:id')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: BundleDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.BUNDLE.NOT_FOUND)
	public async getBundleById(@Param('id') id: string): Promise<BundleDto> {
		return await this.bundleService.getById(id);
	}

	/** Update a bundle */
	@Patch(':id')
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: UpdateBundleSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOkResponse({ type: BundleDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.BUNDLE.NOT_FOUND)
	public async updateBundle(
		@Param('id') id: string,
		@Body() dto: UpdateBundleDto,
		@UploadedFile(ImageValidationPipe(5, false)) file: Express.Multer.File,
	): Promise<BundleDto> {
		return await this.bundleService.updateBundle(id, dto, file);
	}

	/** Delete a bundle */
	@Delete(':id')
	@Auth(UserRole.ADMIN)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.BUNDLE.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.BUNDLE.NOT_FOUND)
	public async removeBundle(@Param('id') id: string): Promise<MessageResponse> {
		return await this.bundleService.removeBundle(id);
	}
}
