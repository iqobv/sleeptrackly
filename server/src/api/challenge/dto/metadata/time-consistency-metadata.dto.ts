import { Expose } from 'class-transformer';
import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class TimeConsistencyMetadataDto {
	/** @remarks '22:00' */
	@Expose()
	@IsString()
	@Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
	targetTime: string;

	@Expose()
	@IsNumber()
	@Min(0)
	marginMinutes: number;
}
