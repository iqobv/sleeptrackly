import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateFriendshipDto, FriendshipDto, UpdateFriendshipDto } from './dto';
import { FriendshipService } from './friendship.service';

@Controller('friends')
export class FriendshipController {
	constructor(private readonly friendshipService: FriendshipService) {}

	@ApiOperation({
		summary: 'Send a friend request',
	})
	@ApiBadRequestResponse({
		description: 'Same user',
	})
	@ApiConflictResponse({
		description: 'Friendship already exists',
	})
	@ApiCreatedResponse({
		type: FriendshipDto,
	})
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

	@ApiOperation({
		summary: 'Get all friends',
	})
	@ApiOkResponse({
		type: [FriendshipDto],
	})
	@Auth()
	@Get('all')
	async getAll(@Authorized('id') userId: string) {
		return await this.friendshipService.getAllByUserId(userId);
	}

	@ApiOperation({
		summary: 'Get all pending requests',
	})
	@ApiOkResponse({
		type: [FriendshipDto],
	})
	@Auth()
	@Get('pendings')
	async getPendingRequests(@Authorized('id') userId: string) {
		return await this.friendshipService.getRequestsByUserId(userId);
	}

	@ApiOperation({
		summary: 'Accept or reject a friend request',
	})
	@ApiNotFoundResponse({
		description: 'Friendship not found',
	})
	@ApiBadRequestResponse({
		description: 'Same status',
	})
	@ApiOkResponse({
		type: FriendshipDto,
	})
	@Auth()
	@Patch(':id')
	async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateFriendshipDto,
	) {
		return await this.friendshipService.update(id, userId, dto);
	}

	@ApiOperation({
		summary: 'Remove a friend',
	})
	@ApiNotFoundResponse({
		description: 'Friendship not found',
	})
	@ApiOkResponse({
		type: Boolean,
	})
	@Auth()
	@Delete(':id')
	async remove(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.friendshipService.remove(userId, id);
	}
}
