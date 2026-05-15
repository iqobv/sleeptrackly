import { PaginatedDataDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { FullProductDto } from './full-product.dto';

export class PaginatedProductDto extends PaginatedDataDto<FullProductDto> {
	@ApiProperty({ type: [FullProductDto] })
	declare items: FullProductDto[];
}
