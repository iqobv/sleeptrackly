import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
	@ApiProperty({ example: '68ffff65-5934-41ef-b351-db066542eb06' })
	id: string;
	@ApiProperty({ example: '68ffff65-5934-41ef-b351-db066542eb06' })
	userId?: string | null;
	@ApiProperty({ example: true })
	isGlobal: boolean;
	@ApiProperty({ example: true })
	isRead: boolean;
	@ApiProperty({ example: true })
	isPush: boolean;
	@ApiProperty({ example: true })
	showInApp: boolean;
	@ApiProperty({ example: true })
	isScheduled: boolean;
	@ApiProperty({ example: true })
	isEmail: boolean;
	@ApiProperty({ example: 'Notification Title' })
	title: string;
	@ApiProperty({ example: 'This is the body of the notification.' })
	body?: string | null;
	@ApiProperty({ example: 'https://example.com/redirect' })
	redirectUrl?: string | null;
	@ApiProperty({ example: new Date() })
	createdAt: Date;
	@ApiProperty({ example: new Date() })
	updatedAt: Date;
	@ApiProperty({ example: new Date() })
	scheduledAt?: Date | null;
}
