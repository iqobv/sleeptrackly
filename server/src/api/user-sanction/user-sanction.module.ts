import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserModule } from '../user/user.module';
import { AdminUserSanctionController } from './admin-user-sanction.controller';
import { UserSanctionController } from './user-sanction.controller';
import { UserSanctionService } from './user-sanction.service';

@Module({
	imports: [UserModule, UserAvatarModule, NotificationModule],
	controllers: [UserSanctionController, AdminUserSanctionController],
	providers: [UserSanctionService],
})
export class UserSanctionModule {}
