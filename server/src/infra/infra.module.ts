import { Module } from '@nestjs/common';
import { FcmModule } from './fcm/fcm.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { R2Module } from './r2/r2.module';

@Module({
	imports: [PrismaModule, MailModule, FcmModule, R2Module],
})
export class InfraModule {}
