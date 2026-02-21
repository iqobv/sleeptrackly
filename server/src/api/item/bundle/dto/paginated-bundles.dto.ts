import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDataDto } from 'src/libs/dto';
import { BundleDto } from './bundle.dto';

export class PaginatedBundlesDto extends PaginatedDataDto<BundleDto> {
	@ApiProperty({ type: [BundleDto] })
	declare items: BundleDto[];
}
