import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserFcmTokenDto } from './dto/create-user-fcm-token.dto';
import { FcmTokenDto } from './dto/fcm-token.dto';

@Injectable()
export class UserFcmTokenService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(
		userId: string,
		dto: CreateUserFcmTokenDto,
		userAgent?: string | null,
	): Promise<FcmTokenDto> {
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

		return plainToInstance(FcmTokenDto, fcmToken);
	}

	public async getTokensByUserId(userId: string): Promise<FcmTokenDto[]> {
		const tokens = await this.prismaService.userFcmToken.findMany({
			where: {
				userId,
			},
		});

		return plainToInstance(FcmTokenDto, tokens);
	}

	public async checkTokenExists(
		userId: string,
		token: string,
	): Promise<boolean> {
		const count = await this.prismaService.userFcmToken.count({
			where: {
				userId,
				token,
			},
		});

		return count > 0;
	}

	public async removeByToken(userId: string, token: string): Promise<boolean> {
		await this.prismaService.userFcmToken.deleteMany({
			where: {
				userId,
				token,
			},
		});

		return true;
	}
}
