import { Auth, Authorized } from '@libs/decorators';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedPurchaseHistoryDto } from './dto';
import { PurchaseHistoryService } from './purchase-history.service';

@Auth()
@ApiTags('Purchase Histories')
@Controller('purchase-histories')
export class PurchaseHistoryController {
	constructor(
		private readonly purchaseHistoryService: PurchaseHistoryService,
	) {}

	/** Get purchase histories of the authenticated user */
	@Get('me')
	@ApiOkResponse({ type: PaginatedPurchaseHistoryDto })
	public async getUserPurchaseHistories(
		@Authorized('id') userId: string,
		@Query() query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedPurchaseHistoryDto> {
		return await this.purchaseHistoryService.getUserPurchaseHistories(
			userId,
			query,
		);
	}
}
