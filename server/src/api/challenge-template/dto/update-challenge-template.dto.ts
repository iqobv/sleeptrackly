import { PartialType } from '@nestjs/swagger';
import { CreateChallengeTemplateDto } from './create-challenge-template.dto';

export class UpdateChallengeTemplateDto extends PartialType(
	CreateChallengeTemplateDto,
) {}
