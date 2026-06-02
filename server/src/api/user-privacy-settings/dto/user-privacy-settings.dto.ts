import { OmitType } from '@nestjs/swagger';
import { UserPrivacySettingsEntityDto } from './user-privacy-settings.dto.entity';

export class BaseUserPrivacySettingsDto extends UserPrivacySettingsEntityDto {}

export class UserPrivacySettingsDto extends OmitType(
	UserPrivacySettingsEntityDto,
	['id', 'createdAt', 'updatedAt', 'userId'] as const,
) {}
