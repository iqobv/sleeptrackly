import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UserProviderService {
	constructor(private readonly prismaService: PrismaService) {}

	async findProvider(provider: string, providerId: string) {
		return this.prismaService.userProvider.findUnique({
			where: { provider_providerId: { provider, providerId } },
			include: { user: true },
		});
	}

	async createProvider(provider: string, providerId: string, userId: string) {
		return this.prismaService.userProvider.create({
			data: { provider, providerId, user: { connect: { id: userId } } },
		});
	}
}
