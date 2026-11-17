import { Expose, Type } from 'class-transformer';

export class NotificationSseSignalEventData {
	@Expose() action: string;
	@Expose() timestamp: number;
}

export class NotificationSseSignalEvent {
	@Expose()
	@Type(() => NotificationSseSignalEventData)
	data: NotificationSseSignalEventData;

	@Expose() type: string;
}
