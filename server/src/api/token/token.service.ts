import { UserDto } from '@api/user/dto/user-response.dto';
import type { Prisma, Token } from '@generated/prisma/client';
import { TokenType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { userSelect } from '@libs/prisma/user.select.prisma';
import { generateRawToken, hashToken } from '@libs/utils/token.util';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
	constructor(private readonly prismaService: PrismaService) {}

	public async createToken(
		dto: CreateTokenDto,
		tx?: Prisma.TransactionClient,
	): Promise<Token> {
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

	public async deleteToken(
		tokenId: string,
		tx?: Prisma.TransactionClient,
	): Promise<Token> {
		const prisma = tx ?? this.prismaService;

		return await prisma.token.delete({ where: { id: tokenId } });
	}

	public async verifyAndConsumeToken(
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	): Promise<UserDto> {
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

		return plainToInstance(UserDto, record.user);
	}

	public async findToken(
		token: string,
		type: TokenType,
		tx?: Prisma.TransactionClient,
	): Promise<Token> {
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
