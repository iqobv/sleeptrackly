import { IsDateString } from 'class-validator';

export class UpdateUserSleepStatusDto {
	@IsDateString()
	clickedBy: Date;
}
