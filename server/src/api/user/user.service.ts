import {
	ConflictException,
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserSanctionType } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { userSelect } from 'src/libs/prisma';
import {
	comparePassword,
	generateUsername as generateUsernameUtil,
	hashPassword,
} from 'src/libs/utils';
import { CoinService } from '../coin/coin.service';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserNotificationSettingsService } from '../user-notification-settings/user-notification-settings.service';
import { UserPrivacySettingsService } from '../user-privacy-settings/user-privacy-settings.service';
import { UserSleepStatusService } from '../user-sleep-status/user-sleep-status.service';
import { CreateUserDto, PasswordRecoveryDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userSleepStatusService: UserSleepStatusService,
		@Inject(forwardRef(() => UserAvatarService))
		private readonly userAvatarService: UserAvatarService,
		private readonly userNotificationSettingsService: UserNotificationSettingsService,
		private readonly coinService: CoinService,
		private readonly userInventoryService: UserInventoryService,
		private readonly userPrivacySettingsService: UserPrivacySettingsService,
	) {}

	async create(dto: CreateUserDto) {
		const { email, username, password, emailVerified = false } = dto;

		await this.alreadyExists({ email, username });

		const hashedPassword = password ? await hashPassword(password) : null;

		return await this.prismaService.$transaction(async (tx) => {
			const user = await tx.user.create({
				data: {
					email,
					username,
					password: hashedPassword,
					emailVerified,
				},
				select: userSelect,
			});

			await this.userSleepStatusService.createSleepStatus(user.id, tx);
			await this.userAvatarService.create(user.id, tx);
			await this.userNotificationSettingsService.create(user.id, tx);
			await this.coinService.create(user.id, tx);
			await this.userPrivacySettingsService.createUserPrivacySettings(
				user.id,
				tx,
			);

			return user;
		});
	}

	async findByEmail(email: string, full: boolean = false) {
		return this.prismaService.user.findUnique({
			where: { email },
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});
	}

	async findById(id: string, full: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...userSelect,
				...(full && { password: true }),
				sanctions: true,
				coins: { select: { amount: true } },
			},
		});

		if (!user) throw new NotFoundException('User not found');

		const equippedItems = await this.userInventoryService.getUserEquippedItems(
			user.id,
		);

		return { ...user, equippedItems };
	}

	async getById(id: string, full: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});

		return user;
	}

	async findByUsername(username: string) {
		const user = await this.prismaService.user.findUnique({
			where: { username },
			select: userSelect,
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async findManyByUsername(username: string, userId: string) {
		const user = await this.getById(userId);

		const users = await this.prismaService.user.findMany({
			where: {
				username: { contains: username, mode: 'insensitive' },
				userPrivacySettings: { acceptFriendRequests: true },
			},
			select: {
				id: true,
				username: true,
				avatar: { select: { url: true } },
			},
		});

		return users.filter(({ id }) => id !== user?.id);
	}

	async changePassword(id: string, dto: PasswordRecoveryDto) {
		const { newPassword, oldPassword } = dto;

		const user = await this.findById(id, true);

		const oldPasswordMatch =
			oldPassword &&
			user.password &&
			(await this.passwordIsMatch(id, oldPassword));

		if (oldPassword && !oldPasswordMatch)
			throw new ConflictException('Wrong password');

		if (oldPassword)
			if (newPassword === oldPassword)
				throw new ConflictException('Same password');

		const newHashedPassword = newPassword
			? await hashPassword(newPassword)
			: null;

		return await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				password: newHashedPassword,
			},
			select: userSelect,
		});
	}

	async update(id: string, dto: UpdateUserDto, isSystem = false) {
		const { email, username, emailVerified } = dto;

		const user = await this.findById(id, true);

		if (user.sanctions.length > 0) {
			const activeChangeUsernameSanction = user.sanctions.find(
				({ endsAt, type }) =>
					endsAt &&
					new Date(endsAt) > new Date() &&
					type === UserSanctionType.USERNAME_CHANGE_BAN,
			);

			if (activeChangeUsernameSanction && username && !isSystem)
				throw new ForbiddenException(
					`You are banned from changing username${activeChangeUsernameSanction.endsAt ? ` until ${dayjs(activeChangeUsernameSanction.endsAt).format('DD.MM.YYYY HH:mm')}` : '.'}`,
				);
		}

		await this.alreadyExists({ email, username });

		const updated = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				email,
				username,
				emailVerified,
			},
			select: userSelect,
		});

		return updated;
	}

	async passwordIsMatch(id: string, password: string) {
		const user = await this.findById(id, true);

		const isMatch =
			user.password && (await comparePassword(password, user.password));

		return isMatch;
	}

	async remove(id: string) {
		const user = await this.findById(id);

		await this.prismaService.user.delete({ where: { id: user.id } });

		return true;
	}

	async removeUnverifiedUsersOlderThan(milliseconds: number) {
		const cutoffDate = new Date(Date.now() - milliseconds);

		const usersToRemove = await this.prismaService.user.findMany({
			where: {
				emailVerified: false,
				createdAt: { lt: cutoffDate },
			},
			select: { id: true },
		});

		const userIds = usersToRemove.map((user) => user.id);

		await this.prismaService.user.deleteMany({
			where: { id: { in: userIds } },
		});

		return true;
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleRemoveUnverifiedUsersOlderThan() {
		return await this.removeUnverifiedUsersOlderThan(24 * 60 * 60 * 1000);
	}

	async generateUsername(): Promise<string> {
		let attempts = 0;

		while (attempts < 100) {
			const username = generateUsernameUtil();

			const user = await this.prismaService.user.findUnique({
				where: { username },
			});

			if (!user) {
				return username;
			}

			attempts++;
		}

		throw new InternalServerErrorException();
	}

	private async alreadyExists({
		email,
		username,
	}: {
		email?: string;
		username?: string;
	}) {
		const user = await this.prismaService.user.findFirst({
			where: { OR: [{ email }, { username }] },
			select: userSelect,
		});

		if (user) throw new ConflictException('User already exists');
	}
}
