import { HttpService } from '@nestjs/axios';
import {
	BadGatewayException,
	ConflictException,
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
} from '@nestjs/common';
import { UserSanctionType } from '@prisma/client';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { firstValueFrom } from 'rxjs';
import { CloudinaryService } from 'src/infra/cloudinary/cloudinary.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { DEFAULT_AVATAR } from 'src/libs/constants';
import { Readable } from 'stream';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAvatarService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cloudinaryService: CloudinaryService,
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

		console.log(user);

		if (user.sanctions.length > 0) {
			const activeBan = user.sanctions.find(
				({ endsAt, type }) =>
					endsAt &&
					new Date(endsAt) > new Date() &&
					type === UserSanctionType.AVATAR_CHANGE_BAN,
			);

			if (activeBan)
				throw new ForbiddenException(
					`You are banned from changing avatar${activeBan.endsAt ? ` until ${dayjs(activeBan.endsAt).format('DD.MM.YYYY HH:mm')}` : '.'}`,
				);
		}

		const filename = randomUUID();
		file.filename = filename;

		if (!avatar.isDefault)
			await this.cloudinaryService.deleteFile(avatar.url.split('.')[0]);

		const metadata = await this.cloudinaryService.uploadFile(file, {
			filename_override: filename,
			public_id: filename,
		});

		const url = `${metadata.public_id}.${metadata.format}`;

		if (!metadata) throw new BadGatewayException('Error uploading image');

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

	async create(userId: string) {
		const existingAvatar = await this.prismaService.userAvatar.findUnique({
			where: { userId },
		});

		if (existingAvatar) throw new ConflictException('Avatar already exists');

		const newAvatar = await this.prismaService.userAvatar.create({
			data: { user: { connect: { id: userId } } },
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
			data: { url, isDefault: !!url.includes(DEFAULT_AVATAR) },
		});
	}

	async deleteAvatar(userId: string) {
		const avatar = await this.findByUserId(userId);

		if (avatar) await this.cloudinaryService.deleteFile(avatar.url);

		return await this.update(avatar?.id, DEFAULT_AVATAR);
	}
}
