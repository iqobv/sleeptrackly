import { Prisma } from '@generated/prisma/client';
import { UserSanctionType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { R2Service } from '@infra/r2/r2.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { HttpService } from '@nestjs/axios';
import {
	BadGatewayException,
	ConflictException,
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import sharp from 'sharp';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAvatarService {
	private readonly DEFAULT_AVATAR_PATH = 'defaults/default-avatar.png';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly r2Service: R2Service,
		private readonly httpService: HttpService,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
	) {}

	async createForAllUsers() {
		const allUsers = await this.prismaService.user.findMany({
			select: { id: true },
		});

		const userWithAvatar = await this.prismaService.userAvatar.findMany({
			select: { userId: true },
		});

		const usersWithoutAvatar = allUsers.filter(
			({ id }) => !userWithAvatar.find(({ userId }) => userId === id),
		);

		await this.prismaService.userAvatar.createMany({
			data: usersWithoutAvatar.map(({ id }) => ({ userId: id })),
		});

		return true;
	}

	async upload(file: Express.Multer.File, userId: string) {
		const avatar = await this.findByUserId(userId);

		const user = await this.userService.findById(userId, true);

		if (user.sanctions.length > 0) {
			const activeBan = user.sanctions.find(
				({ endsAt, type }) =>
					endsAt &&
					new Date(endsAt) > new Date() &&
					type === UserSanctionType.AVATAR_CHANGE_BAN,
			);

			if (activeBan)
				throw new ForbiddenException({
					...ERROR_MESSAGES.AVATAR.CHANGE_BANNED,
					meta: { endsAt: activeBan.endsAt },
				});
		}

		const processedBuffer = await sharp(file.buffer)
			.webp({ quality: 100 })
			.resize(800, 800, { fit: 'cover' })
			.toBuffer();

		const filename = uuidv4();
		file.filename = filename;

		if (!avatar.isDefault) await this.r2Service.delete(avatar.url);

		const metadata = await this.r2Service.upload(
			processedBuffer,
			`avatars/${filename}.webp`,
			'image/webp',
		);

		const url = metadata.key;

		if (!metadata)
			throw new BadGatewayException(ERROR_MESSAGES.AVATAR.UPLOAD_FAILED);

		return this.update(avatar.id, url);
	}

	async uploadProviderAvatar(avatarUrl: string, userId: string) {
		const response = await firstValueFrom(
			this.httpService.get<ArrayBuffer>(avatarUrl, {
				responseType: 'arraybuffer',
			}),
		);

		const buffer = Buffer.from(response.data);

		const file: Express.Multer.File = {
			fieldname: 'file',
			originalname: 'avatar.jpg',
			encoding: '7bit',
			mimetype: 'image/jpeg',
			size: response.data.byteLength,
			destination: '',
			filename: 'avatar.jpg',
			path: '',
			buffer,
			stream: Readable.from(buffer),
		};

		await this.upload(file, userId);
	}

	async create(userId: string, tx?: Prisma.TransactionClient) {
		const prisma = tx || this.prismaService;

		const existingAvatar = await prisma.userAvatar.findUnique({
			where: { userId },
		});

		if (existingAvatar)
			throw new ConflictException(ERROR_MESSAGES.AVATAR.ALREADY_EXISTS);

		const newAvatar = await prisma.userAvatar.create({
			data: {
				url: this.DEFAULT_AVATAR_PATH,
				user: { connect: { id: userId } },
			},
		});

		return newAvatar;
	}

	private async findByUserId(userId: string) {
		let avatar = await this.prismaService.userAvatar.findUnique({
			where: { userId },
		});

		if (!avatar) {
			avatar = await this.prismaService.userAvatar.create({
				data: { user: { connect: { id: userId } } },
			});
		}

		return avatar;
	}

	private async update(id: string, url: string) {
		return await this.prismaService.userAvatar.update({
			where: { id },
			data: { url, isDefault: !!url.includes(this.DEFAULT_AVATAR_PATH) },
		});
	}

	async deleteAvatar(userId: string) {
		const avatar = await this.findByUserId(userId);

		if (avatar) await this.r2Service.delete(avatar.url);

		return await this.update(avatar?.id, this.DEFAULT_AVATAR_PATH);
	}

	async fixAvatarUrls() {
		const avatars = await this.prismaService.userAvatar.findMany({
			where: {
				isDefault: false,
				url: { not: { startsWith: 'avatars/' } },
			},
		});

		for (const avatar of avatars) {
			const url = avatar.url;
			if (!url.startsWith('avatars/')) {
				await this.prismaService.userAvatar.update({
					where: { id: avatar.id },
					data: { url: `avatars/${url}` },
				});
			}
		}
	}
}
