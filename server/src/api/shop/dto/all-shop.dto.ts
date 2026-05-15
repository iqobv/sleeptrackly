import { FullProductDto } from '@api/product/dto';
import { PaginatedDataDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class AllShopDto extends PaginatedDataDto<FullProductDto> {
	@ApiProperty({ type: [FullProductDto] })
	declare items: FullProductDto[];
}
