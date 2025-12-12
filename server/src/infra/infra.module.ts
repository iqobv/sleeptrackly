import { Module } from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FcmModule } from './fcm/fcm.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
	imports: [PrismaModule, CloudinaryModule, MailModule, RedisModule, FcmModule],
})
export class InfraModule {}
