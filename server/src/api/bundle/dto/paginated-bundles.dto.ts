import { PaginatedDataDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { BundleDto } from './bundle.dto';

export class PaginatedBundlesDto extends PaginatedDataDto<BundleDto> {
	@ApiProperty({ type: [BundleDto] })
	declare items: BundleDto[];
}
