import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/api/user/user.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
	controllers: [SessionController],
	exports: [SessionService],
	imports: [UserModule, HttpModule],
	providers: [SessionService],
})
export class SessionModule {}
