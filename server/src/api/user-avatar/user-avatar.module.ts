import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserAvatarController } from './user-avatar.controller';
import { UserAvatarService } from './user-avatar.service';

@Module({
	controllers: [UserAvatarController],
	providers: [UserAvatarService],
	imports: [HttpModule, forwardRef(() => UserModule)],
	exports: [UserAvatarService],
})
export class UserAvatarModule {}
