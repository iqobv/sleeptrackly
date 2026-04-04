import { Injectable, NotFoundException } from '@nestjs/common';
import crypto, { createHash } from 'crypto';
import type { User } from 'generated/prisma/client';
import { TokenType } from 'generated/prisma/enums';
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

		const hashToken = this.hashToken(token);

		const newToken = await this.prismaService.token.create({
			data: {
				token: hashToken,
				expires,
				type,
				...(user && {
					user: { connect: { id: user?.id } },
				}),
			},
		});

		return {
			...newToken,
			token,
		};
	}

	async deleteToken(tokenId: string) {
		return await this.prismaService.token.delete({ where: { id: tokenId } });
	}

	async findToken(token: string, type: TokenType) {
		const hashedToken = this.hashToken(token);

		const existsToken = await this.prismaService.token.findFirst({
			where: { type, token: hashedToken },
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

	private readonly hashToken = (token: string) => {
		return createHash('sha256').update(token).digest('hex');
	};
}
