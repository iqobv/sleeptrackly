import { Visibility } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserPrivacySettings {
	@IsOptional()
	@IsBoolean()
	acceptFriendRequests?: boolean;

	@IsOptional()
	@IsBoolean()
	showActivity?: boolean;

	/** @example PUBLIC */
	@ApiProperty({ enum: Visibility, enumName: 'Visibility' })
	@IsOptional()
	@IsEnum(Visibility)
	profileVisibility?: Visibility;

	@ApiProperty({ enum: Visibility, enumName: 'Visibility' })
	@IsOptional()
	@IsEnum(Visibility)
	achievementsVisibility?: Visibility;

	@ApiProperty({ enum: Visibility, enumName: 'Visibility' })
	@IsOptional()
	@IsEnum(Visibility)
	statisticsVisibility?: Visibility;
}
