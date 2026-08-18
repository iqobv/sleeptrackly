import { ChallengeTier } from '@generated/prisma/enums';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class GenerateChallengeDto {
	@IsUUID('4')
	templateId: string;

	@Type(() => Date)
	@IsDate()
	availableFrom: Date;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	availableTo?: Date;
}

export class GenerateChallengeForTierDto extends OmitType(
	GenerateChallengeDto,
	['templateId'] as const,
) {
	@ApiProperty({ enum: ChallengeTier, enumName: 'ChallengeTier' })
	@IsEnum(ChallengeTier)
	tier: ChallengeTier;

	@IsOptional()
	@IsUUID('4', { each: true })
	usedTemplateIds?: string[];
}
