import { Module } from '@nestjs/common';
import { UserProviderService } from './user-provider.service';

@Module({
	providers: [UserProviderService],
	exports: [UserProviderService],
})
export class UserProviderModule {}
