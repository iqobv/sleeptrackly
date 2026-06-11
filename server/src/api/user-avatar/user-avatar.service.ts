import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { UserSanctionType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DEFAULT_URLS } from '@libs/constants/default-urls.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { HttpService } from '@nestjs/axios';
import {
	ConflictException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { Readable } from 'stream';
import { UserAvatarDto } from './dto/user-avatar.dto';

@Injectable()
export class UserAvatarService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly httpService: HttpService,
		private readonly imageService: ImageService,
	) {}

	public async upload(
		file: Express.Multer.File,
		userId: string,
	): Promise<UserAvatarDto> {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId, deletedAt: null },
			select: {
				avatar: true,
				sanctions: {
					where: {
						type: UserSanctionType.AVATAR_CHANGE_BAN,
						endsAt: { gt: new Date() },
					},
				},
			},
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		if (user.sanctions && user.sanctions.length > 0) {
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

		let avatar = user.avatar;
		if (!avatar) {
			avatar = await this.prismaService.userAvatar.create({
				data: { user: { connect: { id: userId } } },
			});
		}

		const uploadResult = await this.imageService.uploadImage({
			file,
			folder: 'avatars',
			oldUrl: avatar.url,
			placeholderUrl: DEFAULT_URLS.AVATAR,
			options: { width: 800, height: 800, quality: 100 },
		});

		return await this.update(avatar.id, uploadResult.url);
	}

	public async uploadProviderAvatar(
		avatarUrl: string,
		userId: string,
	): Promise<void> {
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

	public async create(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<UserAvatarDto> {
		const prisma = tx || this.prismaService;

		const existingAvatar = await prisma.userAvatar.findUnique({
			where: { userId },
		});

		if (existingAvatar)
			throw new ConflictException(ERROR_MESSAGES.AVATAR.ALREADY_EXISTS);

		const newAvatar = await prisma.userAvatar.create({
			data: {
				url: DEFAULT_URLS.AVATAR,
				user: { connect: { id: userId } },
			},
		});

		return newAvatar;
	}

	private async findByUserId(userId: string): Promise<UserAvatarDto> {
		let avatar = await this.prismaService.userAvatar.findUnique({
			where: { userId },
		});

		if (!avatar) {
			avatar = await this.prismaService.userAvatar.create({
				data: { user: { connect: { id: userId } } },
			});
		}

		return plainToInstance(UserAvatarDto, avatar);
	}

	private async update(id: string, url: string): Promise<UserAvatarDto> {
		const avatar = await this.prismaService.userAvatar.update({
			where: { id },
			data: { url, isDefault: !!url.includes(DEFAULT_URLS.AVATAR) },
		});

		return plainToInstance(UserAvatarDto, avatar);
	}

	public async deleteAvatar(userId: string): Promise<UserAvatarDto> {
		const avatar = await this.findByUserId(userId);

		if (avatar) {
			if (!avatar.isDefault || !avatar.url.includes(DEFAULT_URLS.AVATAR))
				await this.imageService.deleteImage(avatar.url);
		}

		return await this.update(avatar?.id, DEFAULT_URLS.AVATAR);
	}
}
