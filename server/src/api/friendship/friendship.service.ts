import { NotificationService } from '@api/notification/notification.service';
import {
	FriendshipStatus,
	NotificationType,
	Prisma,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { userSelect } from '@libs/prisma/user.select.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import ms from 'ms';
import { FriendDto, FriendRequestDto } from './dto/friend.dto';
import { BaseFriendshipDto, FriendshipDto } from './dto/friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { UserFriendRequestsDto, UserFriendsDto } from './dto/user-friend.dto';

const selectUserFields = {
	id: true,
	username: true,
	avatar: { select: { url: true, isDefault: true } },
	sleepStatus: { select: { isSleeping: true } },
	userPrivacySettings: {
		select: { showActivity: true, acceptFriendRequests: true },
	},
} satisfies Prisma.UserSelect;

const selectFriendshipFields = {
	requester: { select: selectUserFields },
} satisfies Prisma.FriendshipInclude;

@Injectable()
export class FriendshipService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	public async sendFriendshipRequest(
		requesterId: string,
		addresseeId: string,
	): Promise<FriendshipDto> {
		if (requesterId === addresseeId)
			throw new BadRequestException(
				ERROR_MESSAGES.FRIENDSHIP.CANNOT_FRIEND_SELF,
			);

		const addressee = await this.getUserById(addresseeId);

		if (!addressee.userPrivacySettings?.acceptFriendRequests)
			throw new BadRequestException(
				ERROR_MESSAGES.FRIENDSHIP.REQUESTS_DISABLED,
			);

		const friendship = await this.alreadyExists(requesterId, addressee.id);

		let newFriendship: Prisma.FriendshipGetPayload<{
			include: typeof selectFriendshipFields;
		}>;

		if (friendship) {
			newFriendship = await this.update(friendship.id, requesterId, {
				status: FriendshipStatus.PENDING,
			});
		} else {
			newFriendship = await this.prismaService.friendship.create({
				data: {
					requester: { connect: { id: requesterId } },
					addressee: { connect: { id: addressee.id } },
				},
				include: selectFriendshipFields,
			});
		}

		if (addressee.notificationSettings?.isFriendRequestsEnabled) {
			await this.notificationService.create({
				userId: addressee.id,
				title: 'New Friend Request',
				body: `You have a new friend request from ${newFriendship.requester.username}`,
				isEmail: false,
				isGlobal: false,
				isPush: false,
				showInApp: true,
				redirectUrl: `/friends/pending`,
				type: NotificationType.FRIEND_REQUEST,
			});
		}

		return plainToInstance(FriendshipDto, newFriendship);
	}

	public async alreadyExists(
		requesterId: string,
		addresseeId: string,
	): Promise<BaseFriendshipDto | null> {
		const friendship = await this.prismaService.friendship.findFirst({
			where: {
				OR: [
					{ requesterId, addresseeId },
					{ requesterId: addresseeId, addresseeId: requesterId },
				],
			},
		});

		if (friendship) {
			if (friendship?.status === FriendshipStatus.REJECTED) {
				const now = new Date();

				if (ms('1d') > now.getTime() - friendship.updatedAt.getTime()) {
					throw new BadRequestException(
						ERROR_MESSAGES.FRIENDSHIP.REQUEST_COOLDOWN,
					);
				}

				return friendship;
			} else {
				if (
					friendship?.status === FriendshipStatus.BLOCKED &&
					friendship.addresseeId === requesterId
				)
					throw new BadRequestException(ERROR_MESSAGES.FRIENDSHIP.USER_BLOCKED);

				throw new ConflictException(ERROR_MESSAGES.FRIENDSHIP.ALREADY_EXISTS);
			}
		}

		return null;
	}

	public async getAllByUserId(userId: string): Promise<UserFriendsDto> {
		const friendships = await this.prismaService.friendship.findMany({
			where: {
				OR: [{ requesterId: userId }, { addresseeId: userId }],
				status: FriendshipStatus.ACCEPTED,
			},
			include: {
				addressee: { select: selectUserFields },
				requester: { select: selectUserFields },
			},
		});

		const countOfPendingRequests = await this.prismaService.friendship.count({
			where: { addresseeId: userId, status: FriendshipStatus.PENDING },
		});

		const friends = friendships.map((f): FriendDto => {
			const isRequester = f.requesterId === userId;
			const user = isRequester ? f.addressee : f.requester;

			const userStatus = user.userPrivacySettings?.showActivity
				? user.sleepStatus?.isSleeping
					? 'Sleeping'
					: 'Offline'
				: 'Unknown';

			return {
				id: f.id,
				status: f.status,
				user: {
					id: user.id,
					username: user.username,
					avatar: user.avatar?.url || null,
					status: userStatus,
				},
			};
		});

		const result: UserFriendsDto = { friends, countOfPendingRequests };

		return plainToInstance(UserFriendsDto, result);
	}

	public async getRequestsByUserId(
		userId: string,
	): Promise<UserFriendRequestsDto> {
		const friendships = await this.prismaService.friendship.findMany({
			where: { addresseeId: userId, status: FriendshipStatus.PENDING },
			include: { requester: { select: selectUserFields } },
		});

		const friends: FriendRequestDto[] = friendships.map((f) => ({
			id: f.id,
			status: f.status,
			createdAt: f.createdAt,
			user: {
				id: f.requesterId,
				username: f.requester.username,
				avatar: f.requester.avatar?.url || null,
			},
		}));

		const result: UserFriendRequestsDto = {
			friends,
			countOfPendingRequests: friends.length,
		};

		return plainToInstance(UserFriendRequestsDto, result);
	}

	public async getFriendshipByUsersIds(
		userA: string,
		userB: string,
	): Promise<BaseFriendshipDto | null> {
		const friendship = await this.prismaService.friendship.findFirst({
			where: {
				OR: [
					{ requesterId: userA, addresseeId: userB },
					{ requesterId: userB, addresseeId: userA },
				],
			},
		});

		return friendship ? plainToInstance(BaseFriendshipDto, friendship) : null;
	}

	private async findFriendshipById(
		id: string,
		userId: string,
	): Promise<BaseFriendshipDto | null> {
		const friendship = await this.prismaService.friendship.findFirst({
			where: { id, OR: [{ requesterId: userId }, { addresseeId: userId }] },
		});

		return friendship;
	}

	public async update(
		id: string,
		userId: string,
		dto: UpdateFriendshipDto,
	): Promise<FriendshipDto> {
		const { status } = dto;

		const friendship = await this.findFriendshipById(id, userId);

		if (!friendship)
			throw new NotFoundException(ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND);

		if (friendship.status === status)
			throw new BadRequestException(ERROR_MESSAGES.FRIENDSHIP.STATUS_DUPLICATE);

		const newFriendship = await this.prismaService.friendship.update({
			where: {
				id: friendship.id,
				OR: [{ requesterId: userId }, { addresseeId: userId }],
			},
			data: { status },
			include: selectFriendshipFields,
		});

		return plainToInstance(FriendshipDto, newFriendship);
	}

	public async updateManyPendingRequests(
		userId: string,
		status: FriendshipStatus,
	): Promise<BaseFriendshipDto[]> {
		const friendships = await this.prismaService.friendship.updateManyAndReturn(
			{
				where: { addresseeId: userId, status: FriendshipStatus.PENDING },
				data: { status },
			},
		);

		return plainToInstance(BaseFriendshipDto, friendships);
	}

	public async remove(userId: string, id: string): Promise<MessageResponse> {
		const friendship = await this.findFriendshipById(id, userId);

		if (!friendship)
			throw new NotFoundException(ERROR_MESSAGES.FRIENDSHIP.NOT_FOUND);

		await this.prismaService.friendship.delete({
			where: {
				OR: [{ requesterId: userId }, { addresseeId: userId }],
				id: friendship.id,
			},
		});

		return SUCCESS_MESSAGES.FRIENDSHIP.DELETED;
	}

	private async getUserById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id, deletedAt: null },
			select: {
				id: true,
				userPrivacySettings: userSelect.userPrivacySettings,
				notificationSettings: { select: { isFriendRequestsEnabled: true } },
			},
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		return user;
	}
}
