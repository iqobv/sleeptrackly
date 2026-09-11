import { IsUUID } from 'class-validator';

export class CreateFriendshipDto {
	@IsUUID('4') addresseeId: string;
}
