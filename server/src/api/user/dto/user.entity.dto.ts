import { UserCoinDto } from '@api/coin/dto/coin.dto';
import { BaseUserAvatarDto } from '@api/user-avatar/dto/user-avatar.dto';
import { UserEquippedItemDto } from '@api/user-inventory/dto/equipped-item.dto';
import { UserPrivacySettingsDto } from '@api/user-privacy-settings/dto/user-privacy-settings.dto';
import { UserSanctionDto } from '@api/user-sanction/dto/user-sanction.dto';
import { UserRole } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class UserEntityDto extends DefaultFieldsDto {
	@Expose() email: string;
	@Expose() username: string;
	@Expose() emailVerified: boolean;
	@Expose() password: string | null;
	@Expose() timezone: string;
	@Expose() challengeRecoveries: number;
	@Expose() challengeRecoveriesUpdatedAt: Date | null;

	@Expose()
	@ApiProperty({ enum: UserRole, enumName: 'UserRole' })
	role: UserRole;

	@Expose() deletedAt: Date | null;

	@Expose()
	@Type(() => BaseUserAvatarDto)
	avatar: BaseUserAvatarDto | null;

	@Expose()
	@Type(() => UserCoinDto)
	coins: UserCoinDto | null;

	@Expose()
	@Type(() => UserPrivacySettingsDto)
	userPrivacySettings: UserPrivacySettingsDto | null;

	@Expose()
	@Type(() => UserEquippedItemDto)
	equippedItems: UserEquippedItemDto[];

	@Expose()
	@Type(() => UserSanctionDto)
	sanctions: UserSanctionDto[] | null;
}
