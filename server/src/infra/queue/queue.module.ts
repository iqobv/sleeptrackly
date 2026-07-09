import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				connection: {
					host: config.getOrThrow<string>('REDIS_HOST', 'localhost'),
					port: Number(config.getOrThrow<number>('REDIS_PORT', 6380)),
					password: config.getOrThrow<string>('REDIS_PASSWORD'),
				},
				defaultJobOptions: {
					attempts: 3,
					backoff: { type: 'exponential', delay: 1000 },
					removeOnComplete: {
						age: 3600,
						count: 100,
					},
					removeOnFail: {
						age: 24 * 3600 * 7,
						count: 1000,
					},
				},
			}),
		}),
	],
})
export class QueueModule {}
