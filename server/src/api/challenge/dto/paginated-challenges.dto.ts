import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { BaseChallengeDto } from './challenge.dto';

export class PaginatedChallengesDto extends PaginatedDataDto<BaseChallengeDto> {
	@Type(() => BaseChallengeDto)
	@Expose()
	declare items: BaseChallengeDto[];
}
