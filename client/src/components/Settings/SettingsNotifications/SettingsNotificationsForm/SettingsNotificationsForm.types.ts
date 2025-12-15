import { UpdateNotificationSettingsDto } from '@/dto';

export type UpdateFunction = (
	dto: Partial<UpdateNotificationSettingsDto>
) => void;
export type NotificationFieldName = keyof UpdateNotificationSettingsDto;
