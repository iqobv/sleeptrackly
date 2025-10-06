import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { FriendshipStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { UpdateFriendshipDto } from './dto';

const selectUserFields: Prisma.UserSelect = {
	username: true,
	id: true,
	avatar: { select: { url: true } },
	sleepStatus: { select: { isSleeping: true } },
};

@Injectable()
export class FriendshipService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	async sendFriendshipRequest(requesterId: string, addresseeId: string) {
		if (requesterId === addresseeId) throw new BadRequestException('Same user');

		const addressee = await this.userService.findById(addresseeId);

		await this.alreadyExists(requesterId, addressee.id);

		const friendship = await this.prismaService.friendship.create({
			data: {
				requester: { connect: { id: requesterId } },
				addressee: { connect: { id: addressee.id } },
			},
		});

		return friendship;
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

		if (friendship) throw new ConflictException('Friendship already exists');
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

			return {
				id: f.id,
				status: f.status,
				user: {
					id: user.id,
					username: user.username,
					avatar: user.avatar?.url,
					isSleeping: user.sleepStatus?.isSleeping,
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

	private async findFriendshipById(id: string, userId: string) {
		const friendship = await this.prismaService.friendship.findUnique({
			where: { id, OR: [{ requesterId: userId }, { addresseeId: userId }] },
		});

		return friendship;
	}

	async update(id: string, userId: string, dto: UpdateFriendshipDto) {
		const { status } = dto;

		const friendship = await this.findFriendshipById(id, userId);

		if (!friendship) throw new NotFoundException('Friendship not found');

		if (friendship.status === status)
			throw new BadRequestException('Same status');

		const newFriendship = await this.prismaService.friendship.update({
			where: {
				id: friendship.id,
				OR: [{ requesterId: userId }, { addresseeId: userId }],
			},
			data: { status },
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

		if (!friendship) throw new NotFoundException('Friendship not found');

		await this.prismaService.friendship.delete({
			where: {
				OR: [{ requesterId: userId }, { addresseeId: userId }],
				id: friendship.id,
			},
		});

		return true;
	}
}
