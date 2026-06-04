import { IsDateString, IsOptional } from 'class-validator';

export class UpdateUserSanctionDto {
	@IsDateString()
	@IsOptional()
	endsAt?: Date;
}
