import { User } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { userInventorySelect } from '@libs/prisma/user-inventory.select.prisma';
import { userSelect } from '@libs/prisma/user.select.prisma';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProfileStatisticsDto } from './dto/profile-statistics.dto';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getProfileByUsername(
		username: string,
		authUser: User | null,
	): Promise<ProfileDto> {
		const user = await this.prismaService.user.findUnique({
			where: { username, deletedAt: null },
			select: {
				...userSelect,
				inventory: { where: { isEquipped: true }, select: userInventorySelect },
				...(authUser && authUser.username !== username
					? {
							sentFriendRequests: { where: { addresseeId: authUser.id } },
							receivedFriendRequests: { where: { requesterId: authUser.id } },
						}
					: {}),
				_count: {
					select: {
						sleepEntries: true,
						challenges: {
							where: { isCompleted: true },
						},
					},
				},
			},
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.PROFILE.NOT_FOUND);

		const isSameUser = user.id === authUser?.id;
		const isAdmin = authUser?.role === 'ADMIN';
		const isRestrictedViewer = !isSameUser && !isAdmin;

		const friendshipRecord =
			user.sentFriendRequests?.[0] || user.receivedFriendRequests?.[0] || null;
		const isFriend = friendshipRecord?.status === 'ACCEPTED';

		if (isRestrictedViewer) {
			if (user.userPrivacySettings?.profileVisibility === 'PRIVATE') {
				throw new NotFoundException(ERROR_MESSAGES.PROFILE.NOT_FOUND);
			}
			if (
				user.userPrivacySettings?.profileVisibility === 'FRIENDS' &&
				!isFriend
			) {
				throw new NotFoundException(ERROR_MESSAGES.PROFILE.NOT_FOUND);
			}
		}

		const canViewStatistics =
			!isRestrictedViewer ||
			user.userPrivacySettings?.statisticsVisibility === 'PUBLIC' ||
			(user.userPrivacySettings?.statisticsVisibility === 'FRIENDS' &&
				isFriend);

		const statistics: ProfileStatisticsDto = {
			countOfSleepEntries: canViewStatistics ? user._count.sleepEntries : 0,
			countOfCompletedChallenges: canViewStatistics
				? user._count.challenges
				: 0,
		};

		const {
			inventory,
			_count,
			sentFriendRequests: _sfr,
			receivedFriendRequests: _rfr,
			...userData
		} = user;

		const finalProfile: ProfileDto = {
			...userData,
			friendship: friendshipRecord,
			statistics,
			equippedItems: inventory,
		};

		return plainToInstance(ProfileDto, finalProfile);
	}
}
