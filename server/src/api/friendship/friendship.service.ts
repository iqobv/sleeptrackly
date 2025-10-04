import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { FriendshipStatus } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserService } from '../user/user.service';
import { UpdateFriendshipDto } from './dto';

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
		return await this.prismaService.friendship.findMany({
			where: {
				OR: [{ requesterId: userId }, { addresseeId: userId }],
				status: FriendshipStatus.ACCEPTED,
			},
		});
	}

	async getRequestsByUserId(userId: string) {
		return await this.prismaService.friendship.findMany({
			where: { addresseeId: userId, status: FriendshipStatus.PENDING },
		});
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
