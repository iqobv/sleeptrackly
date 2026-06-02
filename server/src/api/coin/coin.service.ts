import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseCoinDto, UpdateCoinDto } from './dto';

@Injectable()
export class CoinService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<BaseCoinDto> {
		if (await this.getUserCoin(userId))
			throw new ConflictException(ERROR_MESSAGES.COIN.DUPLICATE);

		return await this.saveToDb(userId, tx);
	}

	public async update(dto: UpdateCoinDto): Promise<BaseCoinDto> {
		const { amount, userId } = dto;

		const userCoin = await this.getUserCoin(userId);

		if (!userCoin) throw new NotFoundException(ERROR_MESSAGES.COIN.NOT_FOUND);

		return await this.prismaService.userCoin.update({
			where: { userId, id: userCoin.id },
			data: {
				amount,
			},
		});
	}

	public async getUserCoin(userId: string): Promise<BaseCoinDto> {
		const coin = await this.prismaService.userCoin.findUnique({
			where: {
				userId,
			},
		});

		if (!coin) return await this.saveToDb(userId);

		return plainToInstance(BaseCoinDto, coin);
	}

	private async saveToDb(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<BaseCoinDto> {
		const prisma = tx ?? this.prismaService;

		return await prisma.userCoin.create({
			data: {
				user: { connect: { id: userId } },
			},
		});
	}
}
