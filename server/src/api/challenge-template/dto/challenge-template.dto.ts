import { OmitType } from '@nestjs/swagger';
import { ChallengeTemplateEntityDto } from './challenge-template.entity.dto';

export class BaseChallengeTemplateDto extends OmitType(
	ChallengeTemplateEntityDto,
	['translations'] as const,
) {}

export class ChallengeTemplateDto extends BaseChallengeTemplateDto {}
