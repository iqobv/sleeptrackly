import { ImageModule } from '@api/image/image.module';
import { UserModule } from '@api/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserAvatarController } from './user-avatar.controller';
import { UserAvatarService } from './user-avatar.service';

@Module({
	controllers: [UserAvatarController],
	providers: [UserAvatarService],
	imports: [HttpModule, UserModule, ImageModule],
	exports: [UserAvatarService],
})
export class UserAvatarModule {}
