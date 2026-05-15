import { Visibility } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserPrivacySettings {
	@ApiProperty({ example: true })
	@IsOptional()
	@IsBoolean()
	acceptFriendRequests?: boolean;

	@ApiProperty({ example: true })
	@IsOptional()
	@IsBoolean()
	showActivity?: boolean;

	@ApiProperty({ example: Visibility.PUBLIC, enum: Visibility })
	@IsOptional()
	@IsEnum(Visibility)
	profileVisibility?: Visibility;

	@ApiProperty({ example: Visibility.PRIVATE, enum: Visibility })
	@IsOptional()
	@IsEnum(Visibility)
	achievementsVisibility?: Visibility;

	@ApiProperty({ example: Visibility.FRIENDS, enum: Visibility })
	@IsOptional()
	@IsEnum(Visibility)
	statisticsVisibility?: Visibility;
}
