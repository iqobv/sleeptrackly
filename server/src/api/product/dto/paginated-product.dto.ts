import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/libs/dto';
import { FullProductDto } from './full-product.dto';

export class PaginatedProductDto extends PaginatedDataDto<FullProductDto> {
	@ApiProperty({ type: [FullProductDto] })
	declare items: FullProductDto[];
}
