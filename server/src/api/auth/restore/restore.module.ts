import { TokenModule } from '@api/token/token.module';
import { UserModule } from '@api/user/user.module';
import { Module } from '@nestjs/common';
import { RestoreController } from './restore.controller';
import { RestoreService } from './restore.service';

@Module({
	controllers: [RestoreController],
	imports: [TokenModule, UserModule],
	providers: [RestoreService],
})
export class RestoreModule {}
