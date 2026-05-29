import {
	FriendshipStatus,
	NotificationType,
	Prisma,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import ms from 'ms';
import { NotificationService } from '../notification/notification.service';
import { UserService } from '../user/user.service';
import { UpdateFriendshipDto } from './dto';

const selectUserFields: Prisma.UserSelect = {
	username: true,
	id: true,
	avatar: { select: { url: true } },
	sleepStatus: { select: { isSleeping: true } },
	userPrivacySettings: {
		select: { showActivity: true, acceptFriendRequests: true },
	},
};

const selectFriendshipFields: Prisma.FriendshipInclude = {
	requester: { select: selectUserFields },
};

@Injectable()
export class FriendshipService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
		private readonly userService: UserService,
	) {}

	async sendFriendshipRequest(requesterId: string, addresseeId: string) {
		if (requesterId === addresseeId)
			throw new BadRequestException(
				ERROR_MESSAGES.FRIENDSHIP.CANNOT_FRIEND_SELF,
			);

		const addressee = await this.userService.findById(addresseeId);

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

		return newFriendship;
	}

	async alreadyExists(requesterId: string, addresseeId: string) {
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
	}

	async getAllByUserId(userId: string) {
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

		const friends = friendships.map((f) => {
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
					avatar: user.avatar?.url,
					status: userStatus,
				},
			};
		});

		return { friends, countOfPendingRequests };
	}

	async getRequestsByUserId(userId: string) {
		const friendships = await this.prismaService.friendship.findMany({
			where: { addresseeId: userId, status: FriendshipStatus.PENDING },
			include: { requester: { select: selectUserFields } },
		});

		const result = friendships.map((f) => ({
			id: f.id,
			status: f.status,
			createdAt: f.createdAt,
			user: {
				id: f.requesterId,
				username: f.requester.username,
				avatar: f.requester.avatar?.url,
			},
		}));

		return result;
	}

	async getFriendshipByUsersIds(userA: string, userB: string) {
		return await this.prismaService.friendship.findFirst({
			where: {
				OR: [
					{ requesterId: userA, addresseeId: userB },
					{ requesterId: userB, addresseeId: userA },
				],
			},
		});
	}

	private async findFriendshipById(id: string, userId: string) {
		const friendship = await this.prismaService.friendship.findFirst({
			where: { id, OR: [{ requesterId: userId }, { addresseeId: userId }] },
		});

		return friendship;
	}

	async update(id: string, userId: string, dto: UpdateFriendshipDto) {
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

		return newFriendship;
	}

	async updateManyPendingRequests(userId: string, status: FriendshipStatus) {
		return await this.prismaService.friendship.updateManyAndReturn({
			where: { addresseeId: userId, status: FriendshipStatus.PENDING },
			data: { status },
		});
	}

	async remove(userId: string, id: string) {
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
}
