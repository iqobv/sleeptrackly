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
} from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { CreateFriendshipDto, FriendshipDto, UpdateFriendshipDto } from './dto';
import { FriendshipService } from './friendship.service';

@ApiTags('Friendship')
@Controller('friends')
export class FriendshipController {
	constructor(private readonly friendshipService: FriendshipService) {}

	@ApiOperation({ summary: 'Send a friend request' })
	@ApiCreatedResponse({ type: FriendshipDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND,
	])
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.FRIENDSHIP.REQUESTS_DISABLED,
		ERROR_MESSAGES.FRIENDSHIP.REQUEST_COOLDOWN,
		ERROR_MESSAGES.FRIENDSHIP.USER_BLOCKED,
		ERROR_MESSAGES.FRIENDSHIP.STATUS_DUPLICATE,
	])
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.FRIENDSHIP.ALREADY_EXISTS,
	)
	@Auth()
	@Post('send')
	async sendRequest(
		@Authorized('id') requesterId: string,
		@Body() dto: CreateFriendshipDto,
	) {
		const { addresseeId } = dto;

		return await this.friendshipService.sendFriendshipRequest(
			requesterId,
			addresseeId,
		);
	}

	@ApiOperation({ summary: 'Get all friends' })
	@ApiOkResponse({ type: [FriendshipDto] })
	@Auth()
	@Get('all')
	async getAll(@Authorized('id') userId: string) {
		return await this.friendshipService.getAllByUserId(userId);
	}

	@ApiOperation({ summary: 'Get all pending requests' })
	@ApiOkResponse({ type: [FriendshipDto] })
	@Auth()
	@Get('pendings')
	async getPendingRequests(@Authorized('id') userId: string) {
		return await this.friendshipService.getRequestsByUserId(userId);
	}

	@ApiOperation({ summary: 'Accept or reject a friend request' })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.FRIENDSHIP.STATUS_DUPLICATE,
	)
	@ApiOkResponse({ type: FriendshipDto })
	@Auth()
	@Patch('id/:id')
	async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateFriendshipDto,
	) {
		return await this.friendshipService.update(id, userId, dto);
	}

	@ApiOperation({ summary: 'Accept or reject all pending requests' })
	@ApiOkResponse({ type: [FriendshipDto] })
	@Auth()
	@Patch('pendings')
	async updateManyPendingRequests(
		@Authorized('id') userId: string,
		@Body() dto: UpdateFriendshipDto,
	) {
		return await this.friendshipService.updateManyPendingRequests(
			userId,
			dto.status,
		);
	}

	@Auth()
	@ApiOperation({ summary: 'Remove a friend' })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.FRIENDSHIP.DELETED)
	@Delete(':id')
	async remove(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.friendshipService.remove(userId, id);
	}
}
