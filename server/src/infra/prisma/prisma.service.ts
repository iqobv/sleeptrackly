import { PrismaClient } from '@generated/prisma/client';
import { isDev } from '@libs/utils';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly configService: ConfigService) {
		const connectionString = configService.getOrThrow<string>('POSTGRES_URI');
		const caCert = configService.getOrThrow<string>('DB_CA_CERT');
		const isProd = !isDev(configService);

		const cleanConnectionString = connectionString.split('?')[0];

		const pool = new Pool({
			connectionString: cleanConnectionString,
			ssl: isProd
				? {
						ca: caCert.replace(/\\n/g, '\n'),
						rejectUnauthorized: true,
					}
				: undefined,
		});

		const adapter = new PrismaPg(pool);

		super({ adapter });
	}

	public async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	public async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}
