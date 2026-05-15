import { IsOptional, IsString } from 'class-validator';

export class UserAgentDto {
	@IsString()
	@IsOptional()
	deviceType?: string;

	@IsString()
	@IsOptional()
	osName?: string;

	@IsString()
	@IsOptional()
	browserName?: string;

	@IsString()
	@IsOptional()
	browserVersion?: string;
}
