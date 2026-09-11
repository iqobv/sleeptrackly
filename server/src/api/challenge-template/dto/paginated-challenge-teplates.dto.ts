import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { BaseChallengeTemplateDto } from './challenge-template.dto';

export class PaginatedChallengeTemplatesDto extends PaginatedDataDto<BaseChallengeTemplateDto> {
	@Type(() => BaseChallengeTemplateDto)
	@Expose()
	declare items: BaseChallengeTemplateDto[];
}
