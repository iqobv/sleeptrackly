import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserProviderModule } from '../user-provider/user-provider.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { SessionSerializer } from './passport.serializer';
import { GoogleStrategy, LocalStrategy } from './strategies';

@Module({
	imports: [
		UserModule,
		UserProviderModule,
		UserAvatarModule,
		PassportModule.register({ session: true }),
		forwardRef(() => EmailConfirmationModule),
	],
	exports: [AuthService],
	controllers: [AuthController],
	providers: [AuthService, SessionSerializer, LocalStrategy, GoogleStrategy],
})
export class AuthModule {}
