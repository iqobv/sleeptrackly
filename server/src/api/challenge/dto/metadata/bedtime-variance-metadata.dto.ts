import { Expose } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class BedtimeVarianceMetadataDto {
	@Expose()
	@IsNumber()
	@Min(0)
	maxVarianceMinutes: number;
}
