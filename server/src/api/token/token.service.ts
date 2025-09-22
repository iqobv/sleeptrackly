import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenType } from '@prisma/client';
import crypto from 'crypto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	private async generateToken(expiresInHours: number) {
		const token = crypto.randomBytes(32).toString('hex');
		const expires = new Date();
		expires.setHours(expires.getHours() + expiresInHours);

		return { token, expires };
	}

	async createToken(
		userId: string,
		type: TokenType,
		expiresInHours: number = 1,
	) {
		const { token, expires } = await this.generateToken(expiresInHours);

		const user = await this.userService.findById(userId);

		const existingToken = await this.prismaService.token.findFirst({
			where: { type, user: { id: user?.id } },
		});

		if (existingToken) await this.deleteToken(existingToken.id);

		const newToken = await this.prismaService.token.create({
			data: { token, expires, type, user: { connect: { id: user?.id } } },
		});

		return newToken;
	}

	async deleteToken(tokenId: string) {
		return await this.prismaService.token.delete({ where: { id: tokenId } });
	}

	async findToken(token: string, type: TokenType) {
		const existsToken = await this.prismaService.token.findFirst({
			where: { type, token },
		});

		if (!existsToken) throw new NotFoundException('Token not found');

		const hasExpired = new Date(existsToken.expires) < new Date();

		if (hasExpired) {
			await this.deleteToken(existsToken.id);
			throw new NotFoundException(
				'Token has expired. Please request a new token for verification.',
			);
		}

		return existsToken;
	}
}
