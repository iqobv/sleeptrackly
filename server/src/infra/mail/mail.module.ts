import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
	exports: [MailService],
	providers: [MailService],
})
export class MailModule {}
