import { Module } from '@nestjs/common';
import { UserPrivacySettingsController } from './user-privacy-settings.controller';
import { UserPrivacySettingsService } from './user-privacy-settings.service';

@Module({
	controllers: [UserPrivacySettingsController],
	providers: [UserPrivacySettingsService],
	exports: [UserPrivacySettingsService],
})
export class UserPrivacySettingsModule {}
