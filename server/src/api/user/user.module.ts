import { UserStatsModule } from '@api/user-stats/user-stats.module';
import { Module } from '@nestjs/common';
import { UserCleanupService } from './services/user-cleanup.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
	exports: [UserService],
	providers: [UserService, UserCleanupService],
	controllers: [UserController],
	imports: [UserStatsModule],
})
export class UserModule {}
