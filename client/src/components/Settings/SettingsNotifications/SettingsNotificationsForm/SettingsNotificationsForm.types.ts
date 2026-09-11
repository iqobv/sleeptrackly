import { UpdateNotificationSettingsDto } from '@/dto/settings/notifications.dto';

export type UpdateFunction = (
	dto: Partial<UpdateNotificationSettingsDto>,
) => void;
export type NotificationFieldName = keyof UpdateNotificationSettingsDto;
