import { FriendshipStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FriendshipEntityDto extends DefaultFieldsDto {
	@Expose() requesterId: string;
	@Expose() addresseeId: string;

	@Expose()
	@ApiProperty({ enum: FriendshipStatus, enumName: 'FriendshipStatus' })
	status: FriendshipStatus;
}
