import { Global, Module } from '@nestjs/common';
import { firebaseAdminProvider } from './fcm.admin';
import { FcmService } from './fcm.service';

@Global()
@Module({
	providers: [firebaseAdminProvider, FcmService],
	exports: [FcmService],
})
export class FcmModule {}
