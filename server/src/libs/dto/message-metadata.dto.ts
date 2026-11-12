import { Expose } from 'class-transformer';

export class MessageMetaDto {
	@Expose() email?: string;
	@Expose() endsAt?: Date;
}
