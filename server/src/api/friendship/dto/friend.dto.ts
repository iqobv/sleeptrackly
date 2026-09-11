import { UserEntityDto } from '@api/user/dto/user.entity.dto';
import { FriendshipStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class BaseFriendDto extends PickType(DefaultFieldsDto, [
	'id',
	'createdAt',
] as const) {
	@Expose()
	@ApiProperty({ enum: FriendshipStatus, enumName: 'FriendshipStatus' })
	status: FriendshipStatus;
}

export class FriendUserDto extends PickType(UserEntityDto, [
	'id',
	'username',
] as const) {
	@Expose() avatar: string | null;
}

export class FullFriendDto extends FriendUserDto {
	@Expose() status: string;
}

export class FriendDto extends OmitType(BaseFriendDto, ['createdAt'] as const) {
	@Expose()
	@Type(() => FullFriendDto)
	user: FullFriendDto;
}

export class FriendRequestDto extends BaseFriendDto {
	@Expose()
	@Type(() => FriendUserDto)
	user: FriendUserDto;
}
