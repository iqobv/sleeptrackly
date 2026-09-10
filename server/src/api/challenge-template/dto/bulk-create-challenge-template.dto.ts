import { Type } from 'class-transformer';
import { IsArray, IsObject } from 'class-validator';
import { CreateChallengeTemplateDto } from './create-challenge-template.dto';

export class BulkCreateChallengeTemplateDto {
	@Type(() => CreateChallengeTemplateDto)
	@IsArray()
	@IsObject({ each: true })
	templates: CreateChallengeTemplateDto[];
}
