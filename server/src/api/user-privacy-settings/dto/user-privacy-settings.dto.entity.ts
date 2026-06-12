import { Visibility } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class UserPrivacySettingsEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() acceptFriendRequests: boolean;
	@Expose() showActivity: boolean;
	@Expose() profileVisibility?: Visibility;
	@Expose() achievementsVisibility?: Visibility;
	@Expose() statisticsVisibility?: Visibility;
}
