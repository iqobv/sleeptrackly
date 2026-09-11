import { IsString } from 'class-validator';

export class ClientInfoDto {
	@IsString()
	ip: string;

	@IsString()
	userAgent: string;
}
