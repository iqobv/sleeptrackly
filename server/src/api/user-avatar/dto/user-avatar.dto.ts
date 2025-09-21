import { ApiProperty } from '@nestjs/swagger';

export class UserAvatarDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	userId: string;

	@ApiProperty({ example: 'default-avatar.png' })
	url: string;

	@ApiProperty({ example: true })
	isDefault: boolean;
}
