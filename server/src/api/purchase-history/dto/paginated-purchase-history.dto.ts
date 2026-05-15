import { PaginatedDataDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { PurchaseHistoryDto } from './purchase-history.dto';

export class PaginatedPurchaseHistoryDto extends PaginatedDataDto<PurchaseHistoryDto> {
	@ApiProperty({ type: [PurchaseHistoryDto] })
	declare items: PurchaseHistoryDto[];
}
