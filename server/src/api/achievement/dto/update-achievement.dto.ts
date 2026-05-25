import { PartialType } from '@nestjs/swagger';
import {
	CreateAchievementDto,
	CreateAchievementSwaggerDto,
} from './create-achievement.dto';

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {}

export class UpdateAchievementSwaggerDto extends PartialType(
	CreateAchievementSwaggerDto,
) {}
