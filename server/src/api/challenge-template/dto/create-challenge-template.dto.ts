import { ChallengeTier, ChallengeType } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsBoolean, IsEnum, IsObject } from 'class-validator';
import { CreateChallengeTemplateTranslationDto } from './create-challenge-template-translation.dto';
import { GenerationRulesDto } from './generation-rules.dto';

export class CreateChallengeTemplateDto {
	@ApiProperty({ enum: ChallengeTier, enumName: 'ChallengeTier' })
	@IsEnum(ChallengeTier)
	tier: ChallengeTier;

	@ApiProperty({ enum: ChallengeType, enumName: 'ChallengeType' })
	@IsEnum(ChallengeType)
	type: ChallengeType;

	@IsBoolean()
	isActive: boolean;

	@Type(() => GenerationRulesDto)
	@IsObject()
	generationRules: GenerationRulesDto;

	@Type(() => CreateChallengeTemplateTranslationDto)
	@ArrayMinSize(1)
	@IsObject({ each: true })
	translations: CreateChallengeTemplateTranslationDto[];
}
