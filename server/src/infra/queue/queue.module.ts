import { redisEnvSchema } from '@config/schemas/redis.schema';
import { EnvService } from '@infra/env/env.service';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		BullModule.forRootAsync({
			inject: [EnvService],
			useFactory: (envService: EnvService) => {
				const redisConfig = envService.getGroup(redisEnvSchema);

				return {
					connection: {
						host: redisConfig.REDIS_HOST,
						port: redisConfig.REDIS_PORT,
						password: redisConfig.REDIS_PASSWORD,
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
				};
			},
		}),
	],
})
export class QueueModule {}
