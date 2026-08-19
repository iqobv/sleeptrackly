import { PrismaClient } from '@generated/prisma/client';
import { EnvService } from '@infra/env/env.service';
import { IS_PROD_ENV } from '@libs/utils/is-dev.util';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { databaseEnvSchema } from '../../config/schemas/database.schema';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(databaseEnvSchema);

		const connectionString = config.POSTGRES_URI;
		const caCert = config.DB_CA_CERT_BASE64;
		const isProd = IS_PROD_ENV;

		const cleanConnectionString = connectionString.split('?')[0];

		const pool = new Pool({
			connectionString: cleanConnectionString,
			ssl: isProd
				? {
						ca: caCert,
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
