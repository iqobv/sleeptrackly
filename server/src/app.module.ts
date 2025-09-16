import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { InfraModule } from './infra/infra.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), InfraModule, ApiModule],
})
export class AppModule {}
