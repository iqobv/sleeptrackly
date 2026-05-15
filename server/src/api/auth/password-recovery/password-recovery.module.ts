import { TokenModule } from '@api/token/token.module';
import { UserModule } from '@api/user/user.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth.module';
import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
	controllers: [PasswordRecoveryController],
	imports: [TokenModule, UserModule, forwardRef(() => AuthModule)],
	exports: [PasswordRecoveryService],
	providers: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
