import { Prisma, UserProvider } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserProviderDto } from './dto';

@Injectable()
export class UserProviderService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findProvider(
		provider: string,
		providerId: string,
		tx?: Prisma.TransactionClient,
	): Promise<Prisma.UserProviderGetPayload<{
		include: { user: true };
	}> | null> {
		const prisma = tx ?? this.prismaService;

		return await prisma.userProvider.findUnique({
			where: { provider_providerId: { provider, providerId } },
			include: { user: true },
		});
	}

	public async createProvider(
		dto: CreateUserProviderDto,
		tx?: Prisma.TransactionClient,
	): Promise<UserProvider> {
		const prisma = tx ?? this.prismaService;

		return await prisma.userProvider.create({
			data: dto,
		});
	}
}
