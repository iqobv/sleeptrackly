import { PaginatedDataDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { BundleDto, FullBundleDto } from './bundle-response.dto';

export class PaginatedBundlesDto extends PaginatedDataDto<BundleDto> {
	@Expose()
	@Type(() => BundleDto)
	declare items: BundleDto[];
}

export class PaginatedFullBundlesDto extends PaginatedDataDto<FullBundleDto> {
	@Expose()
	@Type(() => FullBundleDto)
	declare items: FullBundleDto[];
}

export class PaginatedAvailableBundlesDto extends PaginatedDataDto<BundleDto> {
	@Expose()
	@Type(() => BundleDto)
	declare items: BundleDto[];
}
