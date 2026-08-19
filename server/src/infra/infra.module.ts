import { Module } from '@nestjs/common';
import { EnvModule } from './env/env.module';
import { FcmModule } from './fcm/fcm.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';
import { R2Module } from './r2/r2.module';

@Module({
	imports: [
		PrismaModule,
		MailModule,
		FcmModule,
		R2Module,
		QueueModule,
		EnvModule,
	],
})
export class InfraModule {}
