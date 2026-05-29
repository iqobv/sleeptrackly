import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth } from '@libs/decorators';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePromotionDto, PromotionDto, UpdatePromotionDto } from './dto';
import { PromotionService } from './promotion.service';

@ApiTags('Promotion')
@Controller('promotions')
export class PromotionController {
	constructor(private readonly promotionService: PromotionService) {}

	@ApiOperation({ summary: 'Create a new promotion' })
	@Auth('ADMIN')
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.PROMOTION.PRODUCT_REQUIRED_PAYLOAD_MISSING,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.PROMOTION.ALREADY_EXISTS,
	)
	@ApiOkResponse({ type: PromotionDto })
	@Post()
	async createPromotion(@Body() dto: CreatePromotionDto) {
		return await this.promotionService.createPromotion(dto);
	}

	@ApiOperation({ summary: 'Get all active promotions' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Get()
	async getAllActivePromotions() {
		return await this.promotionService.getAllActivePromotions();
	}

	@ApiOperation({ summary: 'Get all active promotions' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	@Get('alias/:alias')
	async getPromotionByAlias(@Param('alias') alias: string) {
		return await this.promotionService.getPromotionByAlias(alias);
	}

	@ApiOperation({ summary: 'Get all active promotions' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	@Get('id/:id')
	async getPromotionById(@Param('id') id: string) {
		return await this.promotionService.getPromotionById(id);
	}

	@ApiOperation({ summary: 'Update an existing promotion' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	@Patch(':id')
	async updatePromotion(
		@Param('id') id: string,
		@Body() dto: UpdatePromotionDto,
	) {
		return await this.promotionService.updatePromotion(id, dto);
	}

	@ApiOperation({ summary: 'Delete a promotion' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	@Delete(':id')
	async deletePromotion(@Param('id') id: string) {
		return await this.promotionService.deletePromotion(id);
	}
}
