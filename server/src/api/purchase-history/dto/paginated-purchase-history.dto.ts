import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/libs/dto';
import { PurchaseHistoryDto } from './purchase-history.dto';

export class PaginatedPurchaseHistoryDto extends PaginatedDataDto<PurchaseHistoryDto> {
	@ApiProperty({ type: [PurchaseHistoryDto] })
	declare items: PurchaseHistoryDto[];
}
