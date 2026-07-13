import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChallengeCronService {
	constructor(private readonly prismaService: PrismaService) {}
}
