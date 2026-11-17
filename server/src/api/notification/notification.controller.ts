import type { User } from '@generated/prisma/client';
import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { PaginationQueryWithLanguageDto } from '@libs/dto/pagination-language-query.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
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
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateNotificationDto } from './dto/requests/create-notification.dto';
import { UpdateNotificationDto } from './dto/requests/update-notification.dto';
import { NotificationMetaModels } from './dto/responses/metadata/notification-meta-map';
import { NotificationSseSignalEvent } from './dto/responses/notification-signal.dto';
import { NotificationDto } from './dto/responses/notification.dto';
import { PaginatedNotificationDto } from './dto/responses/paginated-notification.dto';
import { NotificationService } from './services/notification.service';

@ApiExtraModels(...NotificationMetaModels)
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
		@Authorized() user: User,
		@Query() query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedNotificationDto> {
		return await this.notificationService.getAllForUser(user, query);
	}

	/** Subscribe to real-time notification signals */
	@Sse('me/stream')
	@Auth()
	@ApiOkResponse({ type: NotificationSseSignalEvent })
	public streamSignals(
		@Authorized('id') userId: string,
	): Observable<NotificationSseSignalEvent> {
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
