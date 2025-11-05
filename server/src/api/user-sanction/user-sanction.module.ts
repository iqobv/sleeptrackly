import { Module } from '@nestjs/common';
import { AdminUserSanctionController } from './admin-user-sanction.controller';
import { UserSanctionController } from './user-sanction.controller';
import { UserSanctionService } from './user-sanction.service';

@Module({
	controllers: [UserSanctionController, AdminUserSanctionController],
	providers: [UserSanctionService],
})
export class UserSanctionModule {}
