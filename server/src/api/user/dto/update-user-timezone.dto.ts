import { IsString, IsTimeZone } from 'class-validator';

export class UpdateUserTimezoneDto {
	@IsString()
	@IsTimeZone()
	timezone: string;
}
