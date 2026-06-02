import { Visibility } from '@generated/prisma/enums';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserPrivacySettings {
	@IsOptional()
	@IsBoolean()
	acceptFriendRequests?: boolean;

	@IsOptional()
	@IsBoolean()
	showActivity?: boolean;

	/**
	 * @example PUBLIC
	 */
	@IsOptional()
	@IsEnum(Visibility)
	profileVisibility?: Visibility;

	/**
	 * @example PUBLIC
	 */
	@IsOptional()
	@IsEnum(Visibility)
	achievementsVisibility?: Visibility;

	/**
	 * @example PUBLIC
	 */
	@IsOptional()
	@IsEnum(Visibility)
	statisticsVisibility?: Visibility;
}
