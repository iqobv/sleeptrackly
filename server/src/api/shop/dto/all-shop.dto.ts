import { ApiProperty } from '@nestjs/swagger';
import { FullProductDto } from 'src/api/product/dto';
import { PaginatedDataDto } from 'src/libs/dto';

export class AllShopDto extends PaginatedDataDto<FullProductDto> {
	@ApiProperty({ type: [FullProductDto] })
	declare items: FullProductDto[];
}
