import { forwardRef, Module } from '@nestjs/common';
import { TokenModule } from 'src/api/token/token.module';
import { UserModule } from 'src/api/user/user.module';
import { AuthModule } from '../auth.module';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
	controllers: [EmailConfirmationController],
	exports: [EmailConfirmationService],
	imports: [TokenModule, forwardRef(() => AuthModule), UserModule],
	providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
