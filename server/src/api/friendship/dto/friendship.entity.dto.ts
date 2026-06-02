import { FriendshipStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class FriendshipEntityDto extends DefaultFieldsDto {
	@Expose() requesterId: string;
	@Expose() addresseeId: string;
	@Expose() status: FriendshipStatus;
}
