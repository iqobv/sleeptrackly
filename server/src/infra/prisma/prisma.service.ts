import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';
import { isDev } from 'src/libs/utils';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly configService: ConfigService) {
		const connectionString = configService.getOrThrow<string>('POSTGRES_URI');
		const encodedCaCert = configService.getOrThrow<string>('DB_CA_CERT_BASE64');
		const isProd = !isDev(configService);

		const cleanConnectionString = connectionString.split('?')[0];

		const cert = Buffer.from(encodedCaCert, 'base64').toString('utf-8');

		const pool = new Pool({
			connectionString: cleanConnectionString,
			ssl: isProd
				? {
						ca: cert,
						rejectUnauthorized: true,
					}
				: undefined,
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
