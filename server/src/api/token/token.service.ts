import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenType, User } from '@prisma/client';
import crypto from 'crypto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
	) {}

	private generateToken(expiresInMins: number) {
		const token = crypto.randomBytes(32).toString('hex');
		const expires = new Date();
		expires.setMinutes(expires.getMinutes() + expiresInMins);

		return { token, expires };
	}

	async createToken(
		userId: string | null,
		type: TokenType,
		expiresInMins: number = 60,
	) {
		const { token, expires } = this.generateToken(expiresInMins);

		let user: User | null = null;

		if (userId) user = await this.userService.findById(userId);

		if (user) {
			const existingToken = await this.prismaService.token.findFirst({
				where: { type, user: { id: user.id } },
			});

			if (existingToken) await this.deleteToken(existingToken.id);
		}

		const newToken = await this.prismaService.token.create({
			data: {
				token,
				expires,
				type,
				...(user && {
					user: { connect: { id: user?.id } },
				}),
			},
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
