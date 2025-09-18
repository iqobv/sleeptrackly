import {
	BadGatewayException,
	ConflictException,
	Injectable,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CloudinaryService } from 'src/infra/cloudinary/cloudinary.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { DEFAULT_AVATAR } from 'src/libs/constants';

@Injectable()
export class UserAvatarService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cloudinaryService: CloudinaryService,
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

	async create(userId: string) {
		const avatar = await this.findByUserId(userId);

		if (avatar) throw new ConflictException('Avatar already exists');

		const newAvatar = await this.prismaService.userAvatar.create({
			data: { user: { connect: { id: userId } } },
		});

		return newAvatar;
	}

	private async findByUserId(userId: string) {
		let avatar = await this.prismaService.userAvatar.findUnique({
			where: { userId },
		});

		if (!avatar) avatar = await this.create(userId);

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
