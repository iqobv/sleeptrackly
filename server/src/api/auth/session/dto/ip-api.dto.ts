import { IsOptional, IsString } from 'class-validator';

export class IpApiDto {
	@IsString()
	@IsOptional()
	countryCode?: string;

	@IsString()
	@IsOptional()
	region?: string;

	@IsString()
	@IsOptional()
	regionName?: string;

	@IsString()
	@IsOptional()
	city?: string;

	@IsString()
	@IsOptional()
	query?: string;
}
