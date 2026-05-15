import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PromotionUsageService } from './promotion-usage.service';

@Controller('promotion-usage')
export class PromotionUsageController {
	constructor(private readonly promotionUsageService: PromotionUsageService) {}

	@ApiOperation({ summary: 'Use a promotion' })
	@Auth()
	@Get(':alias')
	async usePromotion(
		@Param('alias') alias: string,
		@Authorized('id') userId: string,
	) {
		return await this.promotionUsageService.usePromotion(alias, userId);
	}
}
