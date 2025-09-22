import { Module } from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [PrismaModule, CloudinaryModule, MailModule],
})
export class InfraModule {}
