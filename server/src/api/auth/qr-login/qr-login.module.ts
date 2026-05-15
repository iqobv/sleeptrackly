import { TokenModule } from '@api/token/token.module';
import { UserModule } from '@api/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { QrLoginController } from './qr-login.controller';
import { QrLoginService } from './qr-login.service';

@Module({
	controllers: [QrLoginController],
	imports: [TokenModule, forwardRef(() => AuthModule), UserModule],
	providers: [QrLoginService],
})
export class QrLoginModule {}
