import { ApiProperty } from '@nestjs/swagger';
import { Visibility } from 'generated/prisma/enums';
import { DefaultFieldsDto } from 'src/libs/dto';

export class UserPrivacySettingsDto extends DefaultFieldsDto {
	@ApiProperty({ example: '00478b8d-b42d-4570-82c8-6f0828e7ec21' })
	userId: string;

	@ApiProperty({ example: true })
	acceptFriendRequests?: boolean;

	@ApiProperty({ example: true })
	showActivity?: boolean;

	@ApiProperty({ example: Visibility.PUBLIC, enum: Visibility })
	profileVisibility?: Visibility;

	@ApiProperty({ example: Visibility.PRIVATE, enum: Visibility })
	achievementsVisibility?: Visibility;

	@ApiProperty({ example: Visibility.FRIENDS, enum: Visibility })
	statisticsVisibility?: Visibility;
}
