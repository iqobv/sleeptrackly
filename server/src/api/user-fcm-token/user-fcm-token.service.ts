import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { CreateUserFcmTokenDto } from './dto';

@Injectable()
export class UserFcmTokenService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(
		userId: string,
		dto: CreateUserFcmTokenDto,
		userAgent?: string | null,
	) {
		const { token } = dto;

		const fcmToken = await this.prismaService.userFcmToken.upsert({
			where: {
				token,
			},
			update: {
				userAgent,
				userId,
			},
			create: {
				userId,
				token,
				userAgent,
			},
		});

		return fcmToken;
	}

	async getTokensByUserId(userId: string) {
		return await this.prismaService.userFcmToken.findMany({
			where: {
				userId,
			},
		});
	}
}
