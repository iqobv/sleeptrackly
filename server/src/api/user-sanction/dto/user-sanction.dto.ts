import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class UserSanctionDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() reportId: string | null;
	@Expose() createdById: string;
	@Expose() startsAt: Date;
	@Expose() endsAt: Date | null;
	@Expose() type: string;
}
