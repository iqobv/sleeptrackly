import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ChallengeTranslationEntityDto extends DefaultFieldsDto {
	@Expose() challengeId: string;
	@Expose() language: string;
	@Expose() title: string;
	@Expose() description: string;
}

export class ChallengeTranslationDto extends OmitType(
	ChallengeTranslationEntityDto,
	['challengeId', 'createdAt', 'updatedAt', 'id'] as const,
) {}
