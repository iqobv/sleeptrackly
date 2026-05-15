import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserProviderModule } from '../user-provider/user-provider.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { OauthModule } from './oauth/oauth.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { QrLoginModule } from './qr-login/qr-login.module';
import { SessionModule } from './session/session.module';
import { GoogleStrategy, JwtStrategy } from './strategies';

@Module({
	imports: [
		JwtModule.register({}),
		UserModule,
		UserProviderModule,
		UserAvatarModule,
		forwardRef(() => EmailConfirmationModule),
		PasswordRecoveryModule,
		SessionModule,
		QrLoginModule,
		OauthModule,
	],
	exports: [AuthService],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
