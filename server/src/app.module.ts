import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { InfraModule } from './infra/infra.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot(),
		ThrottlerModule.forRoot([
			{
				name: 'short',
				ttl: 1000,
				limit: 20,
			},
			{
				name: 'medium',
				ttl: 10000,
				limit: 60,
			},
			{
				name: 'long',
				ttl: 60000,
				limit: 100,
			},
		]),
		InfraModule,
		ApiModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
	controllers: [AppController],
})
export class AppModule {}
