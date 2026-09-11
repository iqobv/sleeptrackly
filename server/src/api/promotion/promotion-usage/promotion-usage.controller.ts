import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PromotionUsageService } from './promotion-usage.service';

@ApiTags('Promotion Usage')
@Controller('promotion-usage')
export class PromotionUsageController {
	constructor(private readonly promotionUsageService: PromotionUsageService) {}

	/** Use a promotion */
	@Post(':alias')
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
	@HttpCode(HttpStatus.OK)
	public async usePromotion(
		@Param('alias') alias: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.promotionUsageService.usePromotion(alias, userId);
	}
}
