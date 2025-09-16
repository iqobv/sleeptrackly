import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { InfraModule } from './infra/infra.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ScheduleModule.forRoot(),
		InfraModule,
		ApiModule,
	],
	controllers: [AppController],
})
export class AppModule {}
