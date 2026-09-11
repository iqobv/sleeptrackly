import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class ChallengeTemplateTranslationEntityDto extends DefaultFieldsDto {
	@Expose() challengeTemplateId: string;
	@Expose() language: string;
	@Expose() title: string;
	@Expose() description: string;
}
