import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendshipDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	addresseeId: string;
}
