import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
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
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NotificationDto, NotificationQueryDto } from './dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@ApiOperation({ summary: 'Create a new notification' })
	@ApiOkResponse({ type: NotificationDto })
	@Post()
	async create(@Body() dto: CreateNotificationDto) {
		return await this.notificationService.create(dto);
	}

	@Auth()
	@ApiOperation({ summary: 'Get all notifications for the logged-in user' })
	@ApiOkResponse({ type: [NotificationDto] })
	@Get('me')
	async getAllForUser(
		@Authorized('id') userId: string,
		@Query() query: NotificationQueryDto,
	) {
		return await this.notificationService.getAllForUser(userId, query);
	}

	@Auth()
	@ApiOperation({
		summary:
			'Subscribe to real-time notification signals for the logged-in user',
	})
	@ApiOkResponse({ type: [NotificationDto] })
	@Sse('me/stream')
	streamSignals(@Authorized('id') userId: string) {
		return this.notificationService.subscribeToSignals(userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Update a notification by ID' })
	@ApiOkResponse({ type: NotificationDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOTIFICATION.NOT_FOUND)
	@Patch('id/:id')
	async update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
		return await this.notificationService.update(id, dto);
	}

	@Auth()
	@ApiOperation({
		summary: 'Mark all notifications as read for the logged-in user',
	})
	@ApiOkResponse({ type: NotificationDto })
	@Patch('read-all')
	async markAllAsRead(@Authorized('id') userId: string) {
		return await this.notificationService.markAllAsRead(userId);
	}

	@ApiOkResponse({ type: Boolean })
	@ApiOperation({ summary: 'Remove a notification by ID' })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOTIFICATION.NOT_FOUND)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.NOTIFICATION.DELETED)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.notificationService.remove(id);
	}
}
