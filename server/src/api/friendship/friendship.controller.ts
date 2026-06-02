import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	BaseFriendshipDto,
	CreateFriendshipDto,
	FriendshipDto,
	UpdateFriendshipDto,
	UserFriendRequestsDto,
	UserFriendsDto,
} from './dto';
import { FriendshipService } from './friendship.service';

@Auth()
@ApiTags('Friendship')
@Controller('friends')
export class FriendshipController {
	constructor(private readonly friendshipService: FriendshipService) {}

	/** Send a friend request */
	@Post('send')
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
	public async sendRequest(
		@Authorized('id') requesterId: string,
		@Body() dto: CreateFriendshipDto,
	): Promise<FriendshipDto> {
		const { addresseeId } = dto;

		return await this.friendshipService.sendFriendshipRequest(
			requesterId,
			addresseeId,
		);
	}

	/** Get all friends */
	@Get('all')
	@ApiOkResponse({ type: UserFriendsDto })
	public async getAll(
		@Authorized('id') userId: string,
	): Promise<UserFriendsDto> {
		return await this.friendshipService.getAllByUserId(userId);
	}

	/** Get all pending requests */
	@Get('pendings')
	@ApiOkResponse({ type: UserFriendRequestsDto })
	public async getPendingRequests(
		@Authorized('id') userId: string,
	): Promise<UserFriendRequestsDto> {
		return await this.friendshipService.getRequestsByUserId(userId);
	}

	/** Accept or reject a friend request */
	@Patch('id/:id')
	@ApiOkResponse({ type: FriendshipDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.FRIENDSHIP.STATUS_DUPLICATE,
	)
	public async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateFriendshipDto,
	): Promise<FriendshipDto> {
		return await this.friendshipService.update(id, userId, dto);
	}

	/** Accept or reject all pending requests */
	@Patch('pendings')
	@ApiOkResponse({ type: [BaseFriendshipDto] })
	public async updateManyPendingRequests(
		@Authorized('id') userId: string,
		@Body() dto: UpdateFriendshipDto,
	): Promise<BaseFriendshipDto[]> {
		return await this.friendshipService.updateManyPendingRequests(
			userId,
			dto.status,
		);
	}

	/** Delete a friend */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.FRIENDSHIP.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND)
	public async remove(
		@Authorized('id') userId: string,
		@Param('id') id: string,
	): Promise<MessageResponse> {
		return await this.friendshipService.remove(userId, id);
	}
}
