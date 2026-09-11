import { ChallengeTier, ChallengeType } from '@generated/prisma/enums';
import { ChallengeTemplateOrderByWithRelationInput } from '@generated/prisma/models';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { SortOrderDto } from '@libs/dto/sorting.dto';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

type OrderBy = keyof ChallengeTemplateOrderByWithRelationInput;

export const ChallengeTemplateSortBy = {
	createdAt: 'createdAt',
} as const satisfies Partial<Record<OrderBy, OrderBy>>;

export type ChallengeTemplateSortBy =
	(typeof ChallengeTemplateSortBy)[keyof typeof ChallengeTemplateSortBy];

export class ChallengeTemplateQueryDto extends IntersectionType(
	PaginationQueryDto,
	SortOrderDto,
) {
	@ApiProperty({
		enum: ChallengeType,
		enumName: 'ChallengeType',
		required: false,
	})
	@IsOptional()
	@IsEnum(ChallengeType)
	type?: ChallengeType;

	@ApiProperty({
		enum: ChallengeTier,
		enumName: 'ChallengeTier',
		required: false,
	})
	@IsOptional()
	@IsEnum(ChallengeTier)
	tier?: ChallengeTier;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean()
	isActive?: boolean;

	@ApiProperty({
		enum: ChallengeTemplateSortBy,
		enumName: 'ChallengeTemplateSortBy',
		required: false,
	})
	@IsOptional()
	@IsEnum(ChallengeTemplateSortBy)
	sortBy?: ChallengeTemplateSortBy;
}
