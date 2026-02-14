import { IntersectionType } from '@nestjs/swagger';
import { LanguageQueryDto } from './language-query.dto';
import { PaginationQueryDto } from './pagination-query.dto';

export class PaginationQueryWithLanguageDto extends IntersectionType(
	PaginationQueryDto,
	LanguageQueryDto,
) {}
