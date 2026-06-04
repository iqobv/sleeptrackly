import { Prisma } from '@generated/prisma/client';
import { UserSanctionType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { userSelect } from '@libs/prisma';
import { MessageResponse } from '@libs/types';
import {
	comparePassword,
	generateUsername as generateUsernameUtil,
	hashPassword,
} from '@libs/utils';
import {
	ConflictException,
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CoinService } from '../coin/coin.service';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserInventoryService } from '../user-inventory/user-inventory.service';
import { UserNotificationSettingsService } from '../user-notification-settings/services/user-notification-settings.service';
import { UserPrivacySettingsService } from '../user-privacy-settings/user-privacy-settings.service';
import { UserSleepStatusService } from '../user-sleep-status/user-sleep-status.service';
import {
	CreateUserDto,
	FullUserDto,
	FullUserWithPasswordDto,
	InternalUpdateUserDto,
	PasswordRecoveryDto,
	UserDto,
	UsersSearchResultDto,
	UserWithPasswordDto,
} from './dto';

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

	public async create(
		dto: CreateUserDto,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto> {
		const { email, username, password, emailVerified = false } = dto;

		await this.alreadyExists({ email, username });

		const hashedPassword = password ? await hashPassword(password) : null;

		const execute = async (tx: Prisma.TransactionClient): Promise<UserDto> => {
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
			await this.userNotificationSettingsService.findOrCreate(user.id, tx);
			await this.coinService.create(user.id, tx);
			await this.userPrivacySettingsService.createUserPrivacySettings(
				user.id,
				tx,
			);

			const finalUser = await tx.user.findUniqueOrThrow({
				where: { id: user.id },
				select: userSelect,
			});

			return plainToInstance(UserDto, finalUser);
		};

		if (tx) {
			return await execute(tx);
		}

		return await this.prismaService.$transaction(execute);
	}

	public async findByEmail(
		email: string,
		full: true,
	): Promise<UserWithPasswordDto | null>;
	public async findByEmail(
		email: string,
		full?: false,
	): Promise<UserDto | null>;
	public async findByEmail(
		email: string,
		full: boolean,
	): Promise<UserDto | UserWithPasswordDto | null>;
	public async findByEmail(
		email: string,
		full: boolean = false,
	): Promise<unknown> {
		const user = await this.prismaService.user.findUnique({
			where: { email },
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});

		if (!user) return null;

		return plainToInstance(full ? UserWithPasswordDto : UserDto, user);
	}

	public async findById(
		id: string,
		full: true,
	): Promise<FullUserWithPasswordDto>;
	public async findById(id: string, full?: false): Promise<FullUserDto>;
	public async findById(
		id: string,
		full: boolean,
	): Promise<FullUserDto | FullUserWithPasswordDto>;
	public async findById(id: string, full: boolean = false): Promise<unknown> {
		const user = await this.prismaService.user.findUnique({
			where: { id, deletedAt: null },
			select: {
				...userSelect,
				...(full && { password: true }),
				sanctions: true,
			},
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		const equippedItems = await this.userInventoryService.getUserEquippedItems(
			user.id,
		);

		return plainToInstance(full ? FullUserWithPasswordDto : FullUserDto, {
			...user,
			equippedItems,
		});
	}

	public async getById(
		id: string,
		full: boolean = false,
	): Promise<UserDto | UserWithPasswordDto | null> {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...userSelect,
				...(full && { password: true }),
			},
		});

		if (!user) return null;

		return plainToInstance(full ? UserWithPasswordDto : UserDto, user);
	}

	public async findByUsername(username: string): Promise<UserDto> {
		const user = await this.prismaService.user.findUnique({
			where: { username },
			select: userSelect,
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		return plainToInstance(UserDto, user);
	}

	public async findManyByUsername(
		username: string,
		userId: string,
	): Promise<UsersSearchResultDto[]> {
		const users = await this.prismaService.user.findMany({
			where: {
				id: { not: userId },
				username: { contains: username, mode: 'insensitive' },
				userPrivacySettings: { acceptFriendRequests: true },
			},
			select: {
				id: true,
				username: true,
				avatar: { select: { url: true } },
			},
		});

		return plainToInstance(UsersSearchResultDto, users);
	}

	public async changePassword(
		id: string,
		dto: PasswordRecoveryDto,
	): Promise<UserDto> {
		const { newPassword, oldPassword } = dto;

		const user = await this.findById(id, true);

		const oldPasswordMatch =
			oldPassword &&
			user.password &&
			(await this.passwordIsMatch(id, oldPassword));

		if (oldPassword && !oldPasswordMatch)
			throw new ConflictException(ERROR_MESSAGES.USER.OLD_PASSWORD_MISMATCH);

		if (oldPassword)
			if (newPassword === oldPassword)
				throw new ConflictException(
					ERROR_MESSAGES.USER.NEW_PASSWORD_SAME_AS_OLD,
				);

		if (user.deletedAt)
			throw new ForbiddenException(ERROR_MESSAGES.USER.ACCOUNT_DELETED);

		const newHashedPassword = newPassword
			? await hashPassword(newPassword)
			: null;

		const updated = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				password: newHashedPassword,
			},
			select: userSelect,
		});

		return plainToInstance(UserDto, updated);
	}

	public async update(
		id: string,
		dto: InternalUpdateUserDto,
		isSystem = false,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto> {
		const { email, username, ...rest } = dto;

		const prisma = tx ?? this.prismaService;

		const user = await this.findById(id, true);

		if (user.sanctions && user.sanctions.length > 0) {
			const activeChangeUsernameSanction = user.sanctions.find(
				({ endsAt, type }) =>
					endsAt &&
					new Date(endsAt) > new Date() &&
					type === UserSanctionType.USERNAME_CHANGE_BAN,
			);

			if (activeChangeUsernameSanction && username && !isSystem)
				throw new ForbiddenException({
					...ERROR_MESSAGES.USER.USERNAME_CHANGE_BANNED,
					meta: { endsAt: activeChangeUsernameSanction.endsAt },
				});
		}

		if (email || username) {
			await this.alreadyExists({ email, username });
		}

		const updated = await prisma.user.update({
			where: { id: user.id },
			data: {
				email,
				username,
				...rest,
			},
			select: userSelect,
		});

		return plainToInstance(UserDto, updated);
	}

	public async passwordIsMatch(id: string, password: string): Promise<boolean> {
		const user = await this.findById(id, true);

		const isMatch =
			user.password && (await comparePassword(password, user.password));

		return !!isMatch;
	}

	public async remove(id: string): Promise<MessageResponse> {
		const user = await this.findById(id);

		await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				deletedAt: new Date(),
			},
		});

		await this.prismaService.session.deleteMany({
			where: { userId: user.id },
		});

		return SUCCESS_MESSAGES.AUTH.USER_DELETED;
	}

	public async generateUsername(): Promise<string> {
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
	}): Promise<boolean> {
		const user = await this.prismaService.user.findFirst({
			where: { OR: [{ email }, { username }] },
			select: userSelect,
		});

		if (user) {
			if (user.username === username)
				throw new ConflictException(ERROR_MESSAGES.USER.USERNAME_ALREADY_TAKEN);

			throw new ConflictException(ERROR_MESSAGES.USER.ALREADY_EXISTS);
		}

		return false;
	}
}
