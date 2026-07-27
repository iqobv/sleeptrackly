import { Expose } from 'class-transformer';
import { IsNumber, IsString, Matches, Min } from 'class-validator';

export const targetTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class TimeConsistencyMetadataDto {
	/** @example '22:00' */
	@Expose()
	@IsString()
	@Matches(targetTimeRegex)
	targetTime: string;

	@Expose()
	@IsNumber()
	@Min(0)
	marginMinutes: number;
}
