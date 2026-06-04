import { PaginatedDataDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { BundleDto } from './bundle-response.dto';

export class PaginatedBundlesDto extends PaginatedDataDto<BundleDto> {
	@Expose()
	@Type(() => BundleDto)
	declare items: BundleDto[];
}

export class PaginatedFullBundlesDto extends PaginatedDataDto<BundleDto> {
	@Expose()
	@Type(() => BundleDto)
	declare items: BundleDto[];
}

export class PaginatedAvailableBundlesDto extends PaginatedDataDto<BundleDto> {
	@Expose()
	@Type(() => BundleDto)
	declare items: BundleDto[];
}
