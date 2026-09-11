import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionDto } from './dto/promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionService } from './promotion.service';

@Auth(UserRole.ADMIN)
@ApiTags('Promotion')
@Controller('promotions')
export class PromotionController {
	constructor(private readonly promotionService: PromotionService) {}

	/** Create a new promotion */
	@Post()
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.PROMOTION.PRODUCT_REQUIRED_PAYLOAD_MISSING,
	)
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.PROMOTION.ALREADY_EXISTS,
	)
	public async createPromotion(
		@Body() dto: CreatePromotionDto,
	): Promise<PromotionDto> {
		return await this.promotionService.createPromotion(dto);
	}

	/** Get all active promotions */
	@Get()
	@ApiOkResponse({ type: [PromotionDto] })
	public async getAllActivePromotions(): Promise<PromotionDto[]> {
		return await this.promotionService.getAllActivePromotions();
	}

	/** Get a promotion by its alias */
	@Get('alias/:alias')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	public async getPromotionByAlias(
		@Param('alias') alias: string,
	): Promise<PromotionDto> {
		return await this.promotionService.getPromotionByAlias(alias);
	}

	/** Get a promotion by its ID */
	@Get('id/:id')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	public async getPromotionById(
		@Param('id') id: string,
	): Promise<PromotionDto> {
		return await this.promotionService.getPromotionById(id);
	}

	/** Update a promotion */
	@Patch(':id')
	@ApiOkResponse({ type: PromotionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	public async updatePromotion(
		@Param('id') id: string,
		@Body() dto: UpdatePromotionDto,
	): Promise<PromotionDto> {
		return await this.promotionService.updatePromotion(id, dto);
	}

	/** Delete a promotion */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PROMOTION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROMOTION.NOT_FOUND)
	public async deletePromotion(
		@Param('id') id: string,
	): Promise<MessageResponse> {
		return await this.promotionService.deletePromotion(id);
	}
}
