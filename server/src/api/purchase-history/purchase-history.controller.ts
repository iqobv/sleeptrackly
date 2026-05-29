import { Auth, Authorized } from '@libs/decorators';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginatedPurchaseHistoryDto } from './dto';
import { PurchaseHistoryService } from './purchase-history.service';

@ApiTags('Purchase Histories')
@Controller('purchase-histories')
export class PurchaseHistoryController {
	constructor(
		private readonly purchaseHistoryService: PurchaseHistoryService,
	) {}

	@Auth()
	@ApiOperation({ summary: 'Get purchase histories of the authenticated user' })
	@ApiOkResponse({ type: PaginatedPurchaseHistoryDto })
	@Get('me')
	async getUserPurchaseHistories(
		@Authorized('id') userId: string,
		@Query() query: PaginationQueryWithLanguageDto,
	) {
		return await this.purchaseHistoryService.getUserPurchaseHistories(
			userId,
			query,
		);
	}
}
