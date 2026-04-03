import { OmitType } from '@nestjs/swagger';
import { CreatePromotionDto } from './create-promotion.dto';

export class UpdatePromotionDto extends OmitType(CreatePromotionDto, [
	'alias',
] as const) {}
