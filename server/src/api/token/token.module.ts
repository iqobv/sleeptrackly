import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TokenService } from './token.service';

@Module({
	exports: [TokenService],
	imports: [UserModule],
	providers: [TokenService],
})
export class TokenModule {}
