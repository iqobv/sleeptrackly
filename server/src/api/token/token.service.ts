import type { Prisma } from '@generated/prisma/client';
import { TokenType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { userSelect } from '@libs/prisma';
import { generateRawToken, hashToken } from '@libs/utils';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateTokenDto } from './dto';

@Injectable()
export class TokenService {
	constructor(private readonly prismaService: PrismaService) {}

	async createToken(dto: CreateTokenDto, tx?: Prisma.TransactionClient) {
		const { userId, type, expiresAt } = dto;

		const prisma = tx ?? this.prismaService;

		if (userId) {
			await prisma.token.deleteMany({
				where: { userId, type },
			});
		}

		const token = generateRawToken();

		const hashedToken = hashToken(token);

		const newToken = await prisma.token.create({
			data: {
				token: hashedToken,
				expiresAt,
				type,
				userId,
			},
		});

		return {
			...newToken,
			token,
		};
	}

	async deleteToken(tokenId: string, tx?: Prisma.TransactionClient) {
		const prisma = tx ?? this.prismaService;

		return await prisma.token.delete({ where: { id: tokenId } });
	}

	async verifyAndConsumeToken(
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		const hashedToken = hashToken(token);

		const record = await prisma.token.findUnique({
			where: { token: hashedToken },
			include: { user: { select: userSelect } },
		});

		if (!record || record.type !== type) {
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.INVALID);
		}

		if (record.expiresAt < new Date()) {
			await prisma.token.delete({ where: { id: record.id } });
			throw new BadRequestException(ERROR_MESSAGES.TOKEN.EXPIRED);
		}

		try {
			await prisma.token.delete({ where: { id: record.id } });
		} catch (error) {
			console.log(error);
		}

		return { ...record.user };
	}

	async findToken(
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	) {
		const hashedToken = hashToken(token);

		const prisma = tx ?? this.prismaService;

		const existsToken = await prisma.token.findFirst({
			where: { type, token: hashedToken },
		});

		if (!existsToken)
			throw new NotFoundException(ERROR_MESSAGES.TOKEN.NOT_FOUND);

		const hasExpired = new Date(existsToken.expiresAt) < new Date();

		if (hasExpired) {
			await this.deleteToken(existsToken.id, tx);
			throw new NotFoundException(ERROR_MESSAGES.TOKEN.EXPIRED);
		}

		return existsToken;
	}
}
