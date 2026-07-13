import { Prisma } from '@generated/prisma/client';
import { ChallengeType, ChallengeVisibility } from '@generated/prisma/enums';
import { ChallengeOrderByWithRelationInput } from '@generated/prisma/models';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export const ChallengeSortBy = {
	availableTo: 'availableTo',
	availableFrom: 'availableFrom',
	createdAt: 'createdAt',
	durationDays: 'durationDays',
} as const satisfies Partial<
	Record<keyof ChallengeOrderByWithRelationInput, string>
>;

export type ChallengeSortBy =
	(typeof ChallengeSortBy)[keyof typeof ChallengeSortBy];

export class ChallengeQueryDto extends PaginationQueryDto {
	@ApiProperty({
		enum: ChallengeVisibility,
		enumName: 'ChallengeVisibility',
		required: false,
	})
	@IsOptional()
	@IsEnum(ChallengeVisibility)
	visibility?: ChallengeVisibility;

	@ApiProperty({
		enum: ChallengeType,
		enumName: 'ChallengeType',
		required: false,
	})
	@IsOptional()
	@IsEnum(ChallengeType)
	type?: ChallengeType;

	@IsOptional()
	@Type(() => Boolean)
	@IsBoolean()
	showExpired?: boolean;

	@ApiProperty({
		enum: ChallengeSortBy,
		enumName: 'ChallengeSortBy',
		required: false,
	})
	@IsEnum(ChallengeSortBy)
	@IsOptional()
	sortBy?: ChallengeSortBy;

	@ApiProperty({
		enum: Prisma.SortOrder,
		enumName: 'SortOrder',
		required: false,
	})
	@IsEnum(Prisma.SortOrder)
	@IsOptional()
	sortOrder?: Prisma.SortOrder;
}
