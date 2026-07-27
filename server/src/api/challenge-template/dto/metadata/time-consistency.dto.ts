import { targetTimeRegex } from '@api/challenge/dto/metadata/time-consistency-metadata.dto';
import { Expose } from 'class-transformer';
import { IsNumber, IsString, Matches, Min } from 'class-validator';

export class GenerationTimeConsistencyMetadataDto {
	/** @example ['22:00', '22:30'] */
	@Expose()
	@IsString({ each: true })
	@Matches(targetTimeRegex, { each: true })
	targetTime: string[];

	/** @example [30, 60] */
	@Expose()
	@IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
	@Min(0, { each: true })
	marginMinutes: number[];
}
