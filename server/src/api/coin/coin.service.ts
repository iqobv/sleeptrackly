import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UpdateCoinDto } from './dto';

@Injectable()
export class CoinService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string) {
		if (await this.getUserCoin(userId)) {
			throw new ConflictException('User coin record already exists');
		}

		return await this.prismaService.userCoin.create({
			data: {
				user: { connect: { id: userId } },
			},
		});
	}

	async update(dto: UpdateCoinDto) {
		const { amount, userId } = dto;

		const userCoin = await this.getUserCoin(userId);

		if (!userCoin) throw new NotFoundException('User coin record not found');

		return await this.prismaService.userCoin.update({
			where: { userId, id: userCoin.id },
			data: {
				amount,
			},
		});
	}

	async getUserCoin(userId: string) {
		return await this.prismaService.userCoin.findUnique({
			where: {
				userId,
			},
		});
	}
}
