import { NotificationModule } from '@api/notification/notification.module';
import { UserAvatarModule } from '@api/user-avatar/user-avatar.module';
import { UserModule } from '@api/user/user.module';
import { Module } from '@nestjs/common';
import { AdminUserSanctionController } from './admin-user-sanction.controller';
import { UserSanctionController } from './user-sanction.controller';
import { UserSanctionService } from './user-sanction.service';

@Module({
	imports: [UserModule, UserAvatarModule, NotificationModule],
	controllers: [UserSanctionController, AdminUserSanctionController],
	providers: [UserSanctionService],
})
export class UserSanctionModule {}
