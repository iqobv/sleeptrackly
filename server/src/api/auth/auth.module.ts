import { UserAvatarModule } from '@api/user-avatar/user-avatar.module';
import { UserProviderModule } from '@api/user-provider/user-provider.module';
import { UserModule } from '@api/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { OauthModule } from './oauth/oauth.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { QrLoginModule } from './qr-login/qr-login.module';
import { RestoreModule } from './restore/restore.module';
import { SessionModule } from './session/session.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CookieModule } from './cookie/cookie.module';

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
		RestoreModule,
		CookieModule,
	],
	exports: [AuthService],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
