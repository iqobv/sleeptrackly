import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly configService: ConfigService) {
		const connectionString = configService.getOrThrow<string>('POSTGRES_URI');
		const caCert = configService.getOrThrow<string>('DB_CA_CERT');

		const cleanConnectionString = connectionString.split('?')[0];

		const pool = new Pool({
			connectionString: cleanConnectionString,
			ssl: {
				ca: caCert.replace(/\\n/g, '\n'),
				rejectUnauthorized: true,
			},
		});

		const adapter = new PrismaPg(pool);

		super({ adapter });
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
