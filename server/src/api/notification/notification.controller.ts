import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
import { PaginationQueryDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Sse,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { NotificationDto, PaginatedNotificationDto } from './dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { SseSignalEvent } from './interfaces';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('notifications')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	/** Create a new notification */
	@Post()
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: NotificationDto })
	public async create(
		@Body() dto: CreateNotificationDto,
	): Promise<NotificationDto> {
		return await this.notificationService.create(dto);
	}

	/** Get all notifications for the logged-in user */
	@Get('me')
	@Auth()
	@ApiOkResponse({ type: PaginatedNotificationDto })
	public async getAllForUser(
		@Authorized('id') userId: string,
		@Query() query: PaginationQueryDto,
	): Promise<PaginatedNotificationDto> {
		return await this.notificationService.getAllForUser(userId, query);
	}

	/** Subscribe to real-time notification signals */
	@Sse('me/stream')
	@Auth()
	public streamSignals(
		@Authorized('id') userId: string,
	): Observable<SseSignalEvent> {
		return this.notificationService.subscribeToSignals(userId);
	}

	/** Update a notification by ID */
	@Patch('id/:id')
	@Auth()
	@ApiOkResponse({ type: NotificationDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOTIFICATION.NOT_FOUND)
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateNotificationDto,
	): Promise<NotificationDto> {
		return await this.notificationService.update(id, dto);
	}

	/** Mark all notifications as read */
	@Patch('read-all')
	@Auth()
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.NOTIFICATION.MARKED_ALL_AS_READ,
	)
	public async markAllAsRead(
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		await this.notificationService.markAllAsRead(userId);

		return SUCCESS_MESSAGES.NOTIFICATION.MARKED_ALL_AS_READ;
	}

	/** Delete a notification */
	@Delete(':id')
	@Auth(UserRole.ADMIN)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.NOTIFICATION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOTIFICATION.NOT_FOUND)
	public async remove(@Param('id') id: string): Promise<MessageResponse> {
		return await this.notificationService.remove(id);
	}
}
