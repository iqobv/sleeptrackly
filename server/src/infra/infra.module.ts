import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { QueueModule } from './queue/queue.module';
import { R2Module } from './r2/r2.module';

@Module({
	imports: [PrismaModule, MailModule, FcmModule, R2Module, QueueModule],
})
export class InfraModule {}
