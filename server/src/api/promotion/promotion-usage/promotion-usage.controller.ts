import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
import { MessageResponse } from '@libs/types';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PromotionUsageService } from './promotion-usage.service';

@ApiTags('Promotion Usage')
@Controller('promotion-usage')
export class PromotionUsageController {
	constructor(private readonly promotionUsageService: PromotionUsageService) {}

	/** Use a promotion */
	@Get(':alias')
	@Auth()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PROMOTION.USED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.PROMOTION.NOT_FOUND,
		ERROR_MESSAGES.PRODUCT.NOT_FOUND,
		ERROR_MESSAGES.COIN.NOT_FOUND,
	])
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.PROMOTION.HAS_EXPIRED,
		ERROR_MESSAGES.PROMOTION.HAS_REACHED_ITS_USAGE_LIMIT,
		ERROR_MESSAGES.COIN_TRANSACTION.INSUFFICIENT_FUNDS,
	])
	@ApiErrorResponse(HttpStatus.CONFLICT, [
		ERROR_MESSAGES.PROMOTION.ALREADY_USED_THIS_PROMOTION,
		ERROR_MESSAGES.USER_INVENTORY.ITEM_ALREADY_OWNED,
	])
	public async usePromotion(
		@Param('alias') alias: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.promotionUsageService.usePromotion(alias, userId);
	}
}
