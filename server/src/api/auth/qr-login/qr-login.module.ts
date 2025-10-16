import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/api/token/token.module';
import { UserModule } from 'src/api/user/user.module';
import { AuthModule } from '../auth.module';
import { QrLoginController } from './qr-login.controller';
import { QrLoginService } from './qr-login.service';

@Module({
	controllers: [QrLoginController],
	imports: [TokenModule, forwardRef(() => AuthModule), UserModule],
	providers: [QrLoginService],
})
export class QrLoginModule {}
