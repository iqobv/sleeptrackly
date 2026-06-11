import { Module } from '@nestjs/common';
import { UserCleanupService } from './user-cleanup.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	exports: [UserService],
	providers: [UserService, UserCleanupService],
	controllers: [UserController],
})
export class UserModule {}
