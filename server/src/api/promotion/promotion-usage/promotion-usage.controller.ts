import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PromotionUsageService } from './promotion-usage.service';

@ApiTags('Promotion Usage')
@Controller('promotion-usage')
export class PromotionUsageController {
	constructor(private readonly promotionUsageService: PromotionUsageService) {}

	@ApiOperation({ summary: 'Use a promotion' })
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
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.PROMOTION.USED)
	@Auth()
	@Get(':alias')
	async usePromotion(
		@Param('alias') alias: string,
		@Authorized('id') userId: string,
	) {
		return await this.promotionUsageService.usePromotion(alias, userId);
	}
}
