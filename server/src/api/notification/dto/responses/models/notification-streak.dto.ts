import { BaseStreakDto } from '@api/streak/dto/streak.dto';
import { PickType } from '@nestjs/swagger';

export class NotificationStreakDto extends PickType(BaseStreakDto, [
	'id',
	'length',
] as const) {}
