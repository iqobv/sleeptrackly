import { OmitType } from '@nestjs/swagger';
import { UserEntityDto } from './user.entity.dto';

export class FullUserDto extends OmitType(UserEntityDto, [
	'password',
] as const) {}

export class FullUserWithPasswordDto extends UserEntityDto {}
