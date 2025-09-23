import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/api/token/token.module';
import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';
import { UserModule } from 'src/api/user/user.module';
import { AuthModule } from '../auth.module';

@Module({
	controllers: [PasswordRecoveryController],
	imports: [TokenModule, UserModule, forwardRef(() => AuthModule)],
	exports: [PasswordRecoveryService],
	providers: [PasswordRecoveryService],
})
export class PasswordRecoveryModule {}
