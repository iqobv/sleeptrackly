import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { comparePassword, hashPassword } from 'src/libs/utils';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserSleepStatusService } from '../user-sleep-status/user-sleep-status.service';
import { CreateUserDto, PasswordRecoveryDto, UpdateUserDto } from './dto';

const select: Prisma.UserSelect = {
	id: true,
	email: true,
	username: true,
	role: true,
	emailVerified: true,
	createdAt: true,
	avatar: {
		select: {
			url: true,
			isDefault: true,
		},
	},
};

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userSleepStatusService: UserSleepStatusService,
		private readonly userAvatarService: UserAvatarService,
	) {}

	async create(dto: CreateUserDto) {
		const { email, username, password } = dto;

		await this.alreadyExists({ email, username });

		const hashedPassword = password ? await hashPassword(password) : null;

		const user = await this.prismaService.user.create({
			data: {
				email,
				username,
				password: hashedPassword,
			},
			select,
		});

		await this.userSleepStatusService.createSleepStatus(user.id);
		await this.userAvatarService.create(user.id);

		return user;
	}

	async findByEmail(email: string, full: boolean = false) {
		return this.prismaService.user.findUnique({
			where: { email },
			select: {
				...select,
				...(full && { password: true }),
			},
		});
	}

	async findById(id: string, full: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...select,
				...(full && { password: true }),
			},
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async getById(id: string, full: boolean = false) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...select,
				...(full && { password: true }),
			},
		});

		return user;
	}

	async findByUsername(username: string) {
		const user = await this.prismaService.user.findUnique({
			where: { username },
			select: select,
		});

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async findManyByUsername(username: string) {
		return this.prismaService.user.findMany({
			where: { username: { contains: username, mode: 'insensitive' } },
			select: {
				id: true,
				username: true,
				avatar: { select: { url: true } },
			},
		});
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
			select,
		});
	}

	async update(id: string, dto: UpdateUserDto) {
		const { email, username, password, emailVerified } = dto;

		const user = await this.findById(id, true);

		await this.alreadyExists({ email, username });

		const isMatch =
			!!password &&
			!!user.password &&
			(await comparePassword(password, user.password));

		if (isMatch) throw new ConflictException('Password is the same');

		const updated = await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				email,
				username,
				emailVerified,
				...(password && { password: await hashPassword(password) }),
			},
			select,
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

	private async alreadyExists({
		email,
		username,
	}: {
		email?: string;
		username?: string;
	}) {
		const user = await this.prismaService.user.findFirst({
			where: { OR: [{ email }, { username }] },
			select,
		});

		if (user) throw new ConflictException('User already exists');
	}
}
