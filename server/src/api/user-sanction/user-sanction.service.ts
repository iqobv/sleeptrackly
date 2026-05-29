import { UserSanction } from '@generated/prisma/client';
import { NotificationType, UserSanctionType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { NotificationService } from '../notification/notification.service';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserService } from '../user/user.service';
import { CreaeteUserSanctionDto, UpdateUserSanctionDto } from './dto';

@Injectable()
export class UserSanctionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly userAvatarService: UserAvatarService,
		private readonly notificationService: NotificationService,
	) {}

	async findByUserId(userId: string) {
		return await this.prismaService.userSanction.findMany({
			where: { userId },
		});
	}

	private async findByTypeAndUserId(type: UserSanctionType, userId: string) {
		return await this.prismaService.userSanction.findUnique({
			where: { userId_type: { type, userId } },
		});
	}

	async findById(id: string) {
		const sanction = await this.prismaService.userSanction.findUnique({
			where: { id },
		});

		if (!sanction)
			throw new NotFoundException(ERROR_MESSAGES.SANCTION.NOT_FOUND);

		return sanction;
	}

	async create(userId: string, dto: CreaeteUserSanctionDto) {
		const { targetUserId, type, endsAt, startsAt, reportId } = dto;

		if (startsAt > endsAt)
			throw new BadRequestException(
				ERROR_MESSAGES.SANCTION.START_DATE_MUST_BE_BEFORE_END_DATE,
			);

		if (endsAt < new Date())
			throw new BadRequestException(
				ERROR_MESSAGES.SANCTION.END_DATE_MUST_BE_IN_THE_FUTURE,
			);

		let endDate = dayjs(endsAt).toDate();

		const sanction = await this.findByTypeAndUserId(type, targetUserId);

		let userSanction: UserSanction;

		if (sanction) {
			endDate = dayjs(sanction.endsAt).isAfter(dayjs(endsAt))
				? dayjs(sanction.endsAt).toDate()
				: dayjs(endsAt).toDate();

			userSanction = await this.prismaService.userSanction.update({
				where: { userId_type: { type, userId: targetUserId } },
				data: { endsAt: endDate },
			});
		} else {
			userSanction = await this.prismaService.userSanction.create({
				data: {
					user: { connect: { id: targetUserId } },
					createdBy: { connect: { id: userId } },
					startsAt,
					endsAt: endDate,
					type,
					...(reportId && { report: { connect: { id: reportId } } }),
				},
			});
		}

		if (userSanction.type === UserSanctionType.USERNAME_CHANGE_BAN) {
			await this.userService.update(
				targetUserId,
				{
					username: await this.userService.generateUsername(),
				},
				true,
			);
		}

		if (userSanction.type === UserSanctionType.AVATAR_CHANGE_BAN) {
			const userAvatar = await this.prismaService.userAvatar.findUnique({
				where: { userId: targetUserId },
			});
			if (userAvatar && !userAvatar.isDefault)
				await this.userAvatarService.deleteAvatar(targetUserId);
		}

		await this.notificationService.create({
			userId: targetUserId,
			title: 'New Sanction Applied',
			body: `You have been sanctioned with a ${type.replace(/_/g, ' ')} until ${dayjs(
				endDate,
			).format('DD.MM.YYYY HH:mm')}.`,
			isEmail: false,
			isPush: false,
			isGlobal: false,
			showInApp: true,
			type: NotificationType.SANCTION,
		});

		return userSanction;
	}

	async update(id: string, dto: UpdateUserSanctionDto) {
		const { endsAt } = dto;

		if (endsAt && endsAt < new Date())
			throw new BadRequestException(
				ERROR_MESSAGES.SANCTION.END_DATE_MUST_BE_IN_THE_FUTURE,
			);

		const sanction = await this.findById(id);

		const userSanction = await this.prismaService.userSanction.update({
			where: {
				id: sanction.id,
			},
			data: {
				endsAt,
			},
		});

		return userSanction;
	}

	async remove(id: string) {
		await this.findById(id);

		await this.prismaService.userSanction.delete({ where: { id } });

		return true;
	}
}
