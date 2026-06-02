import { BaseFriendshipDto } from '@api/friendship/dto';
import { UserEntityDto } from '@api/user/dto/user.entity.dto';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ProfileStatisticsDto } from './profile-statistics.dto';

@Exclude()
export class ProfileDto extends PickType(UserEntityDto, [
	'username',
	'createdAt',
	'avatar',
	'coins',
	'equippedItems',
] as const) {
	@Expose()
	@Type(() => BaseFriendshipDto)
	friendship: BaseFriendshipDto | null;

	@Expose()
	@Type(() => ProfileStatisticsDto)
	statistics: ProfileStatisticsDto | null;
}
