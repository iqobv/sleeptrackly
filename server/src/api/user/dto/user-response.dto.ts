import { IntersectionType, OmitType, PickType } from '@nestjs/swagger';
import { UserEntityDto } from './user.entity.dto';

export class BaseUserDto extends OmitType(UserEntityDto, [
	'password',
	'avatar',
	'coins',
	'userPrivacySettings',
	'equippedItems',
	'sanctions',
] as const) {}

export class UserDto extends OmitType(UserEntityDto, [
	'password',
	'equippedItems',
	'sanctions',
] as const) {}

export class UserWithPasswordDto extends IntersectionType(
	UserDto,
	PickType(UserEntityDto, ['password'] as const),
) {}

