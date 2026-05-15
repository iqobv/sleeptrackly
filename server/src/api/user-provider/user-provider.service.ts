import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserProviderDto } from './dto';

@Injectable()
export class UserProviderService {
	constructor(private readonly prismaService: PrismaService) {}

	async findProvider(
		provider: string,
		providerId: string,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.userProvider.findUnique({
			where: { provider_providerId: { provider, providerId } },
			include: { user: true },
		});
	}

	async createProvider(
		dto: CreateUserProviderDto,
		tx?: Prisma.TransactionClient,
	) {
		const prisma = tx ?? this.prismaService;

		return await prisma.userProvider.create({
			data: dto,
		});
	}
}
